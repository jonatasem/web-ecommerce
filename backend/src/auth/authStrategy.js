import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Mongo } from '../database/mongo.js';
import { checkPassword } from '../utils/crypto.js';
import { ObjectId } from 'mongodb';

const collectionName = 'users';

passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
        const user = await Mongo.db.collection(collectionName).findOne({ email });

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

// Funções de serialização e desserialização são necessárias para autenticação por sessão.
// Se você for usar apenas JWT, elas podem ser removidas ou não serem usadas, mas é uma boa prática mantê-las.
passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await Mongo.db.collection(collectionName).findOne({ _id: new ObjectId(id) });
        done(null, user);
    } catch (error) {
        done(error);
    }
});