import { Mongo } from '../database/mongo.js';
import { ObjectId } from 'mongodb';

const collectionName = 'orders';

class OrdersService {
    async getOrders() {
        return await Mongo.db.collection(collectionName).find({}).toArray();
    }

    async getOrdersByUserId(userId) {
        return await Mongo.db.collection(collectionName).find({ userId: new ObjectId(userId) }).toArray();
    }

    async addOrder(orderData) {
        const result = await Mongo.db.collection(collectionName).insertOne(orderData);
        return result.ops[0];
    }

    async deleteOrder(orderId) {
        return await Mongo.db.collection(collectionName).findOneAndDelete({ _id: new ObjectId(orderId) });
    }

    async updateOrder(orderId, orderData) {
        const result = await Mongo.db.collection(collectionName).findOneAndUpdate(
            { _id: new ObjectId(orderId) },
            { $set: orderData },
            { returnDocument: 'after' }
        );
        return result.value;
    }
}

export default new OrdersService();