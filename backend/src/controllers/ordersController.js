import ordersService from '../services/ordersService.js';
import { successResponse, errorResponse } from '../utils/response.js';
import { ObjectId } from 'mongodb';

class OrdersController {
    async getOrders(req, res) {
        try {
            const orders = await ordersService.getOrders();
            successResponse(res, orders);
        } catch (error) {
            errorResponse(res, 'Error fetching orders', 500);
        }
    }

    async getOrdersByUserId(req, res) {
        const { id } = req.params;
        if (!ObjectId.isValid(id)) {
            return errorResponse(res, 'Invalid user ID format', 400);
        }
        try {
            const orders = await ordersService.getOrdersByUserId(id);
            successResponse(res, orders);
        } catch (error) {
            errorResponse(res, 'Error fetching user orders', 500);
        }
    }

    async addOrder(req, res) {
        try {
            const result = await ordersService.addOrder(req.body);
            successResponse(res, { text: 'Order added', order: result }, 201);
        } catch (error) {
            console.error('Error adding order:', error);
            errorResponse(res, 'Error adding order', 500);
        }
    }

    async deleteOrder(req, res) {
        const { id } = req.params;
        if (!ObjectId.isValid(id)) {
            return errorResponse(res, 'Invalid order ID format', 400);
        }
        try {
            const result = await ordersService.deleteOrder(id);
            if (result.value) {
                successResponse(res, { text: 'Order deleted' });
            } else {
                errorResponse(res, 'Order not found', 404);
            }
        } catch (error) {
            errorResponse(res, 'Error deleting order', 500);
        }
    }

    async updateOrder(req, res) {
        const { id } = req.params;
        if (!ObjectId.isValid(id)) {
            return errorResponse(res, 'Invalid order ID format', 400);
        }
        try {
            const result = await ordersService.updateOrder(id, req.body);
            if (result) {
                successResponse(res, { text: 'Order updated', order: result });
            } else {
                errorResponse(res, 'Order not found', 404);
            }
        } catch (error) {
            errorResponse(res, 'Error updating order', 500);
        }
    }
}

export default new OrdersController();