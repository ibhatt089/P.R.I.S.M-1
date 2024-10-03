import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const userController = new UserController();
const userRoutes = Router();

userRoutes.get('/:id', (req, res, next) => userController.getUserById(req, res, next));
userRoutes.post('/', (req, res, next) => userController.createUser(req, res, next));
userRoutes.put('/:id', (req, res, next) => userController.updateUser(req, res, next));
userRoutes.delete('/:id', (req, res, next) => userController.deleteUser(req, res, next));
userRoutes.get('/', (req, res, next) => userController.listUsers(req, res, next));
userRoutes.post('/:userId/security-answers', (req, res, next) => userController.addSecurityAnswers(req, res, next));
userRoutes.put('/:userId/password', (req, res, next) => userController.updatePassword(req, res, next));
userRoutes.post('/:userId/reset-password', (req, res, next) => userController.resetPassword(req, res, next));
userRoutes.post('/:userId/unlock', (req, res, next) => userController.unlockUser(req, res, next));
userRoutes.post('/:userId/activate', (req, res, next) => userController.activateUser(req, res, next));

export default userRoutes;