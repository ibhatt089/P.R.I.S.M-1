import { Router } from 'express';
import { CSATController } from '../controllers/CSATController';
import { validateCSATData } from '../middlewares/CSATMiddleware';

const router = Router();
const csatController = new CSATController();

router.post('/', validateCSATData, (req, res, next) => csatController.createCSAT(req, res, next));
router.get('/:id', (req, res, next) => csatController.getCSATById(req, res, next));
router.put('/:id', validateCSATData, (req, res, next) => csatController.updateCSAT(req, res, next));
router.delete('/:id', (req, res, next) => csatController.deleteCSAT(req, res, next));

export default router;