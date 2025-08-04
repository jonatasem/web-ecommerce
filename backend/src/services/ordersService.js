import { Mongo } from '../database/mongo.js';
import { ObjectId } from 'mongodb';

const collectionName = 'orders';

class OrdersService {
    async getOrders() {
        return await Mongo.db.collection(collectionName).find({}).toArray();
    }

    async getOrdersByUserId(userId) {
        // Correção: Envolve o userId em um ObjectId
        return await Mongo.db.collection(collectionName).find({ userId: new ObjectId(userId) }).toArray();
    }

    async addOrder(orderData) {
        // Correção: Adiciona um ObjectId para o userId e para cada plateId nos itens
        const formattedOrderData = {
            ...orderData,
            userId: new ObjectId(orderData.userId),
            items: orderData.items.map(item => ({
                ...item,
                plateId: new ObjectId(item.plateId)
            }))
        };
        const result = await Mongo.db.collection(collectionName).insertOne(formattedOrderData);
        if (result.acknowledged) {
            return { ...formattedOrderData, _id: result.insertedId };
        }
        return null;
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