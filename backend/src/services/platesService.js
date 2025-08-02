import { Mongo } from '../database/mongo.js';
import { ObjectId } from 'mongodb';

const collectionName = 'plates';

class PlatesService {
    async getPlates() {
        return await Mongo.db.collection(collectionName).find({}).toArray();
    }

    async getPlateById(plateId) {
        return await Mongo.db.collection(collectionName).findOne({ _id: new ObjectId(plateId) });
    }

    async getAvailablePlates() {
        return await Mongo.db.collection(collectionName).find({ available: true }).toArray();
    }

    async addPlate(plateData) {
        const result = await Mongo.db.collection(collectionName).insertOne(plateData);
        return result.ops[0];
    }

    async deletePlate(plateId) {
        return await Mongo.db.collection(collectionName).findOneAndDelete({ _id: new ObjectId(plateId) });
    }

    async updatePlate(plateId, plateData) {
        const result = await Mongo.db.collection(collectionName).findOneAndUpdate(
            { _id: new ObjectId(plateId) },
            { $set: plateData },
            { returnDocument: 'after' }
        );
        return result.value;
    }
}

export default new PlatesService();
