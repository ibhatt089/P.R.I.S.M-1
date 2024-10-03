import { Router } from 'express';
import { MilestoneController } from '../controllers/MilestoneController';

const router = Router();
const milestoneController = new MilestoneController();

// Route to get a milestone by ID
router.get('/:id', (req, res, next) => milestoneController.getMilestoneById(req, res, next));

// Route to create a new milestone
router.post('/', (req, res, next) => milestoneController.createMilestone(req, res, next));

// Route to update an existing milestone by ID
router.put('/:id', (req, res, next) => milestoneController.updateMilestone(req, res, next));

// Route to delete a milestone by ID
router.delete('/:id', (req, res, next) => milestoneController.deleteMilestone(req, res, next));

export default router;