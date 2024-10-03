import { Request, Response, NextFunction } from 'express';
import { UserProjectSummaryViewService } from '../services/UserProjectSummaryViewService';

export class UserProjectSummaryViewController {
  private userProjectSummaryViewService: UserProjectSummaryViewService;

  constructor() {
    this.userProjectSummaryViewService = new UserProjectSummaryViewService();
  }

  public async getUserProjectSummary(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const userSummary = await this.userProjectSummaryViewService.getUserProjectSummary(userId);
      res.status(200).json({ success: true, data: userSummary });
    } catch (error) {
      next(error);
    }
  }
}