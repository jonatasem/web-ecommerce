import express from 'express';
import usersController from '../controllers/usersController.js';

const usersRouter = express.Router();

usersRouter.get('/', usersController.getUsers);
usersRouter.delete('/:id', usersController.deleteUser);
usersRouter.put('/:id', usersController.updateUser);

export default usersRouter;