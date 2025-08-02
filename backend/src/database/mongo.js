import { MongoClient } from 'mongodb';

export const Mongo = {
    client: null,
    db: null,

    async connect({ mongoConnectionString, mongoDbName }) {
        if (this.client && this.client.isConnected()) {
            return;
        }

        try {
            const client = new MongoClient(mongoConnectionString);
            await client.connect();

            this.client = client;
            this.db = client.db(mongoDbName);
        } catch (error) {
            throw new Error('Error during mongo connection');
        }
    }
};