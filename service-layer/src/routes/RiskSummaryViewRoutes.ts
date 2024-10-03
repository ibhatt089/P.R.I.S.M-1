import { Router } from 'express';
import { RiskSummaryViewController } from '../controllers/RiskSummaryViewController';

const router = Router();
const riskSummaryViewController = new RiskSummaryViewController();

router.get('/risks/summary', riskSummaryViewController.getRiskSummary);

export default router;