import jwt from 'jsonwebtoken';

import { User } from '../../models/User';
import { SECRET_KEY } from '../../constants/constants';

export const generateToken = (user: User) => {
    const payload = {
        id: user.id,
        login: user.login,
    };

    const options = {
        expiresIn: '1h',
    };

    return jwt.sign(payload, SECRET_KEY, options);
};