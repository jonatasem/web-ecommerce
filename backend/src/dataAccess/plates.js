import { Mongo } from "../database/mongo.js"
import { ObjectId } from 'mongodb'

const collectionName = 'plates'

export default class PlatesDataAccess {
    async getPlates() {
        const result = await Mongo.db
            .collection(collectionName)
            .find({ })
            .toArray()
        return result.map(plate => ({
            id: plate._id,
            title: plate.title,
            sale: plate.sale,
            rating: plate.rating,
            description: plate.description,
            imgUrl: plate.imgUrl, 
            available: plate.available
        }))
    }

    async getPlateById(plateId) {
        const result = await Mongo.db
            .collection(collectionName)
            .findOne({ _id: new ObjectId(plateId) })
        
        if (result) {
            return {
                id: result._id,
                title: result.title,
                sale: result.sale,
                rating: result.rating,
                description: result.description,
                imgUrl: result.imgUrl,
                available: result.available
            }
        }
        return null
    }

    async getAvailablePlates() {
        const result = await Mongo.db
            .collection(collectionName)
            .find({ available: true })
            .toArray()
        return result.map(plate => ({
            id: plate._id,
            title: plate.title,
            sale: plate.sale,
            rating: plate.rating,
            description: plate.description,
            imgUrl: plate.imgUrl,
            available: plate.available
        }))
    }

    async addPlate(plateData) {
        const result = await Mongo.db
            .collection(collectionName)
            .insertOne(plateData) 
        return {
            id: result.insertedId,
            title: plateData.title,
            sale: plateData.sale,
            rating: plateData.rating,
            description: plateData.description,
            imgUrl: plateData.imgUrl,
            available: plateData.available
        }
    }

    async deletePlate (plateId) {
        const result = await Mongo.db
            .collection(collectionName)
            .findOneAndDelete({ _id: new ObjectId(plateId) })
        if (result.value) {
            return {
                id: result.value._id,
                title: result.value.title,
                sale: result.value.sale,
                rating: result.value.rating,
                description: result.value.description,
                imgUrl: result.value.imgUrl,
                available: result.value.available
            }
        }
        return null
    }

    async updatePlate(plateId, plateData) {
        const result = await Mongo.db
            .collection(collectionName)
            .findOneAndUpdate(
                { _id: new ObjectId(plateId) },
                { $set: plateData },
                { returnDocument: 'after' }
            )
        if (result.value) {
            return {
                id: result.value._id,
                title: result.value.title,
                sale: result.value.sale,
                rating: result.value.rating,
                description: result.value.description,
                imgUrl: result.value.imgUrl,
                available: result.value.available
            }
        }
        return null
    }
}