import { Mongo } from '../database/mongo.js';
import { ObjectId } from 'mongodb';
import { hashPassword } from '../utils/crypto.js';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { successResponse, errorResponse } from '../utils/response.js';

const collectionName = 'users';

class AuthController {
    async signup(req, res) {
        const { fullname, email, password } = req.body;
        if (!fullname || !email || !password) {
            return errorResponse(res, 'Missing required fields', 400);
        }

        try {
            const checkUser = await Mongo.db.collection(collectionName).findOne({ email });
            if (checkUser) {
                return errorResponse(res, 'User already exists', 409);
            }

            const { hashedPassword, salt } = await hashPassword(password);
            
            const result = await Mongo.db.collection(collectionName).insertOne({
                fullname,
                email,
                password: hashedPassword,
                salt,
            });

            if (result.insertedId) {
                const user = await Mongo.db.collection(collectionName).findOne({ _id: new ObjectId(result.insertedId) }, { projection: { password: 0, salt: 0 } });
                const token = jwt.sign(user, 'secret');
                successResponse(res, { text: 'User registered', user, token }, 201);
            }
        } catch (error) {
            errorResponse(res, 'Error during signup', 500);
        }
    }

    login(req, res, next) {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                // info.message contém a mensagem de erro do Passport ('Incorrect email' ou 'Incorrect password')
                return errorResponse(res, info.message, 401);
            }
            
            // Retira a senha e o salt do objeto do usuário
            delete user.password;
            delete user.salt;
            
            const token = jwt.sign(user, 'secret');
            successResponse(res, { text: 'User logged in successfully', user, token });
        })(req, res, next);
    }
}

export default new AuthController();