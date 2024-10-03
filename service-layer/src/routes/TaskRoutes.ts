import { Router } from 'express';
import { TaskController } from '../controllers/TaskController';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';
import { PermissionMiddleware } from '../middlewares/PermissionMiddleware';

const router = Router();
const taskController = new TaskController();

// Create a new task
router.post('/', AuthMiddleware.verifyToken, PermissionMiddleware.verifyAdminOrProjectManager, (req, res, next) => taskController.createTask(req, res, next));

// Get a task by ID
router.get('/:id', AuthMiddleware.verifyToken, (req, res, next) => taskController.getTaskById(req, res, next));

// Update a task
router.put('/:id', AuthMiddleware.verifyToken, PermissionMiddleware.verifyAdminOrProjectManager, (req, res, next) => taskController.updateTask(req, res, next));

// Delete a task
router.delete('/:id', AuthMiddleware.verifyToken, PermissionMiddleware.verifyAdminOrProjectManager, (req, res, next) => taskController.deleteTask(req, res, next));

export default router;