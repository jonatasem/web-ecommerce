import platesService from '../services/platesService.js';
import { successResponse, errorResponse } from '../utils/response.js';
import { ObjectId } from 'mongodb';

class PlatesController {
    async getPlates(req, res) {
        try {
            const plates = await platesService.getPlates();
            successResponse(res, plates);
        } catch (error) {
            errorResponse(res, 'Error fetching plates', 500);
        }
    }

    async getPlateById(req, res) {
        const { id } = req.params;
        if (!ObjectId.isValid(id)) {
            return errorResponse(res, 'Invalid plate ID format', 400);
        }

        try {
            const plate = await platesService.getPlateById(id);
            if (plate) {
                successResponse(res, plate);
            } else {
                errorResponse(res, 'Plate not found', 404);
            }
        } catch (error) {
            errorResponse(res, 'Error fetching plate', 500);
        }
    }

    async getAvailablePlates(req, res) {
        try {
            const plates = await platesService.getAvailablePlates();
            successResponse(res, plates);
        } catch (error) {
            errorResponse(res, 'Error fetching available plates', 500);
        }
    }

    async addPlate(req, res) {
        try {
            const result = await platesService.addPlate(req.body);
            successResponse(res, result, 201);
        } catch (error) {
            errorResponse(res, 'Error adding plate', 500);
        }
    }

    async deletePlate(req, res) {
        const { id } = req.params;
        if (!ObjectId.isValid(id)) {
            return errorResponse(res, 'Invalid plate ID format', 400);
        }
        try {
            const result = await platesService.deletePlate(id);
            if (result) {
                successResponse(res, { text: 'Plate deleted' });
            } else {
                errorResponse(res, 'Plate not found', 404);
            }
        } catch (error) {
            errorResponse(res, 'Error deleting plate', 500);
        }
    }

    async updatePlate(req, res) {
        const { id } = req.params;
        if (!ObjectId.isValid(id)) {
            return errorResponse(res, 'Invalid plate ID format', 400);
        }
        try {
            const result = await platesService.updatePlate(id, req.body);
            if (result) {
                successResponse(res, { text: 'Plate updated', plate: result });
            } else {
                errorResponse(res, 'Plate not found', 404);
            }
        } catch (error) {
            errorResponse(res, 'Error updating plate', 500);
        }
    }
}

export default new PlatesController();
