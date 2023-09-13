import passport from 'passport';
import passportLocal from 'passport-local';
import passportJWT from 'passport-jwt';
import { User } from '../models/User';
import { SECRET_KEY } from '../constants/constants';
import bcrypt from 'bcrypt';

const LocalStrategy = passportLocal.Strategy;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(
    new LocalStrategy(
        {
            usernameField: 'login',
            passwordField: 'password',
        },
        async (login, password, done) => {
            try {
                const user = await User.query().findOne({ login });

                if (!user) {
                    return done(null, false, { message: 'User not found' });
                }

                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    )
);

passport.use(
    new JWTStrategy(
        {
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: SECRET_KEY,
        },
        async (jwtPayload, done) => {
            try {
                const user = await User.query().findById(jwtPayload.id);

                if (!user) {
                    return done(null, false, { message: 'User not found' });
                }

                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    )
);

export default passport;
