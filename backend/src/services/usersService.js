import { Mongo } from '../database/mongo.js';
import { ObjectId } from 'mongodb';
import { hashPassword } from '../utils/crypto.js';

const collectionName = 'users';

class UsersService {
    async getUsers() {
        return await Mongo.db.collection(collectionName).find({}).project({ password: 0, salt: 0 }).toArray();
    }

    async deleteUser(userId) {
        return await Mongo.db.collection(collectionName).findOneAndDelete({ _id: new ObjectId(userId) });
    }

    async updateUser(userId, userData) {
        if (userData.password) {
            const { hashedPassword, salt } = await hashPassword(userData.password);
            userData = { ...userData, password: hashedPassword, salt };
        }
        
        const result = await Mongo.db.collection(collectionName).findOneAndUpdate(
            { _id: new ObjectId(userId) },
            { $set: userData },
            { returnDocument: 'after' }
        );

        if (result.value) {
            const { password, salt, ...userWithoutSensitiveData } = result.value;
            return userWithoutSensitiveData;
        }
        return null;
    }
}

export default new UsersService();
