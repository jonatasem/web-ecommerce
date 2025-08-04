import express from 'express';
import ordersController from '../controllers/ordersController.js';

const ordersRouter = express.Router();

ordersRouter.get('/', ordersController.getOrders);
ordersRouter.get('/userorders/:id', ordersController.getOrdersByUserId);
ordersRouter.post('/', ordersController.addOrder);
ordersRouter.delete('/:id', ordersController.deleteOrder);
ordersRouter.put('/:id', ordersController.updateOrder);

export default ordersRouter;
