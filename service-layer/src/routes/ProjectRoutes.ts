import { Router } from 'express';
import { ProjectController } from '../controllers/ProjectController';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';
import { PermissionMiddleware } from '../middlewares/PermissionMiddleware';

const router = Router();
const projectController = new ProjectController();

// Create Project
router.post('/', AuthMiddleware.verifyToken, PermissionMiddleware.verifyAdminOrProjectManager, (req, res, next) => projectController.createProject(req, res, next));

// Get Project by ID
router.get('/:id', AuthMiddleware.verifyToken, PermissionMiddleware.verifyProjectAccess, (req, res, next) => projectController.getProjectById(req, res, next));

// Update Project
router.put('/:id', AuthMiddleware.verifyToken, PermissionMiddleware.verifyAdminOrProjectManager, (req, res, next) => projectController.updateProject(req, res, next));

// Delete Project
router.delete('/:id', AuthMiddleware.verifyToken, PermissionMiddleware.verifyAdminOrProjectManager, (req, res, next) => projectController.deleteProject(req, res, next));

// Get All Projects
router.get('/', AuthMiddleware.verifyToken, (req, res, next) => projectController.getAllProjects(req, res, next));

export default router;