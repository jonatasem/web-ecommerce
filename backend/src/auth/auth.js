import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Mongo } from '../database/mongo.js';
import { checkPassword } from '../utils/crypto.js';

const collectionName = 'users';

passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
        const user = await Mongo.db.collection(collectionName).findOne({ email: email });
        if (!user) {
            return done(null, false, { message: 'Incorrect email.' });
        }

        const passwordMatch = await checkPassword(password, user.salt, user.password);
        if (!passwordMatch) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        
        delete user.password;
        delete user.salt;
        
        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));