import usersService from '../services/usersService.js';
import { successResponse, errorResponse } from '../utils/response.js';
import { ObjectId } from 'mongodb';

class UsersController {
    async getUsers(req, res) {
        try {
            const users = await usersService.getUsers();
            successResponse(res, users);
        } catch (error) {
            errorResponse(res, 'Error fetching users', 500);
        }
    }

    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            if (!ObjectId.isValid(id)) {
                return errorResponse(res, 'Invalid user ID format', 400);
            }
            const result = await usersService.deleteUser(id);
            if (result) {
                successResponse(res, { text: 'User deleted' });
            } else {
                errorResponse(res, 'User not found', 404);
            }
        } catch (error) {
            errorResponse(res, 'Error deleting user', 500);
        }
    }

    async updateUser(req, res) {
        try {
            const { id } = req.params;
            if (!ObjectId.isValid(id)) {
                return errorResponse(res, 'Invalid user ID format', 400);
            }
            const updatedUser = await usersService.updateUser(id, req.body);
            if (updatedUser) {
                successResponse(res, { text: 'User updated', user: updatedUser });
            } else {
                errorResponse(res, 'User not found', 404);
            }
        } catch (error) {
            errorResponse(res, 'Error updating user', 500);
        }
    }
}

export default new UsersController();
