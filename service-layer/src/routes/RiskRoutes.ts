import { Router } from 'express';
import { RiskController } from '../controllers/RiskController';

const router = Router();
const riskController = new RiskController();

// Route to get a risk by ID
router.get('/:id', (req, res, next) => riskController.getRiskById(req, res, next));

// Route to create a new risk
router.post('/', (req, res, next) => riskController.createRisk(req, res, next));

// Route to update an existing risk by ID
router.put('/:id', (req, res, next) => riskController.updateRisk(req, res, next));

// Route to delete a risk by ID
router.delete('/:id', (req, res, next) => riskController.deleteRisk(req, res, next));

export default router;