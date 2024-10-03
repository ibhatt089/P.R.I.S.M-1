import { Router } from 'express';
import { CSATOverviewViewController } from '../controllers/CSATOverviewViewController';

const router = Router();
const csatOverviewViewController = new CSATOverviewViewController();

router.get('/csat/overview', csatOverviewViewController.getCSATOverview);

export default router;