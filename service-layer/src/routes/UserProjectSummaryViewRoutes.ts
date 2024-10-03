import { Router } from 'express';
import { UserProjectSummaryViewController } from '../controllers/UserProjectSummaryViewController';

const router = Router();
const userProjectSummaryViewController = new UserProjectSummaryViewController();

router.get('/users/:userId/summary', userProjectSummaryViewController.getUserProjectSummary);

export default router;