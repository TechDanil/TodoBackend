import { Request, Response } from 'express';
import { User } from '../models/User';
import passport from 'passport';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/generateToken/generateToken';
import { validationResult } from 'express-validator';

class AuthController {
    signup = async (req: Request, res: Response) => {
        try {

            const errors = validationResult(req);
            const { name, last_name, patronymic, login, password, supervisor_id } = req.body;
            const existingUser = await User.query().findOne({ login });

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await User.query().insert({
                name,
                last_name,
                patronymic,
                login,
                password: hashedPassword, 
                supervisor_id,
            });

            return res.status(201).json({ message: 'User registered successfully', user: newUser });
        } catch (error) {
            console.error('Error in signup:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    login = async (req: Request, res: Response) => {
        passport.authenticate('local', { session: false }, (err: Error, user: User, info: unknown) => {
            const errors = validationResult(req);

            if (err) {
                console.error('Authentication error:', err);
                return res.status(500).json({ message: 'Authentication error' });
            }

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
    
            if (!user) {
                console.error('Authentication failed:', info);
                return res.status(401).json({ message: 'Authentication failed' });
            }
    
            const token = generateToken(user);
    
            return res.status(200).json({ message: 'Login successful', user, token });
        })(req, res);
    }
    
}

export default new AuthController();