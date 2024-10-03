import { Router } from 'express';
import { ProjectHealthViewController } from '../controllers/ProjectHealthViewController';

const router = Router();
const projectHealthViewController = new ProjectHealthViewController();

router.get('/projects/:projectId/health', projectHealthViewController.getProjectHealth);

export default router;