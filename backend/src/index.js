import express from 'express';
import cors from 'cors';
import { Mongo } from './database/mongo.js';
import { config } from 'dotenv';
import passport from 'passport'; // Importa o Passport
import authRouter from './routes/auth.js';
import usersRouter from './routes/users.js';
import platesRouter from './routes/plates.js';
import ordersRouter from './routes/orders.js';

// Importa a lógica que configura a estratégia 'local' do Passport
import './auth/authStrategy.js'; // Ajustei o nome do arquivo para maior clareza

config();

async function main() {
    const hostname = 'localhost';
    const port = process.env.PORT || 3000;
    const app = express();

    try {
        await Mongo.connect({
            mongoConnectionString: process.env.MONGO_URI,
            mongoDbName: process.env.MONGO_DB_NAME
        });
        console.log('Connected to MongoDB!');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1);
    }

    // Middlewares
    app.use(express.json());
    app.use(cors());

    // Inicializa o Passport. Isso deve vir antes das rotas que o utilizam.
    app.use(passport.initialize());

    // Rotas da API
    app.get('/', (req, res) => {
        res.send({
            success: true,
            statusCode: 200,
            body: 'Bem vindo a API e-commerce, desenvolvida por JEM'
        });
    });

    app.use('/auth', authRouter);
    app.use('/users', usersRouter);
    app.use('/plates', platesRouter);
    app.use('/orders', ordersRouter);

    app.listen(port, () => {
        console.log(`Server running on: http://${hostname}:${port}`);
    });
}

main();