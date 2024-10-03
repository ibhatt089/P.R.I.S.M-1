import { Router } from 'express';
import { EntityNotificationController } from '../controllers/EntityNotificationController';

const entityNotificationController = new EntityNotificationController();
const entityNotificationRoutes = Router();

entityNotificationRoutes.get('/:id', (req, res, next) => entityNotificationController.getNotificationById(req, res, next));
entityNotificationRoutes.post('/', (req, res, next) => entityNotificationController.createNotification(req, res, next));
entityNotificationRoutes.put('/:id/read', (req, res, next) => entityNotificationController.markNotificationAsRead(req, res, next));
entityNotificationRoutes.delete('/:id', (req, res, next) => entityNotificationController.deleteNotification(req, res, next));

export default entityNotificationRoutes;