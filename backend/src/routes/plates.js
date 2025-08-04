import express from 'express';
import platesController from '../controllers/platesController.js';

const platesRouter = express.Router();

platesRouter.get('/', platesController.getPlates);
platesRouter.get('/availables', platesController.getAvailablePlates);
platesRouter.get('/:id', platesController.getPlateById);
platesRouter.post('/', platesController.addPlate);
platesRouter.delete('/:id', platesController.deletePlate);
platesRouter.put('/:id', platesController.updatePlate);

export default platesRouter;