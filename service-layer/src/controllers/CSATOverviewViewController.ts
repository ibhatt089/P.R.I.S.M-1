import { Request, Response, NextFunction } from 'express';
import { CSATOverviewViewService } from '../services/CSATOverviewViewService';

export class CSATOverviewViewController {
  private csatOverviewViewService: CSATOverviewViewService;

  constructor() {
    this.csatOverviewViewService = new CSATOverviewViewService();
  }

  public async getCSATOverview(req: Request, res: Response, next: NextFunction) {
    try {
      const csatOverview = await this.csatOverviewViewService.getCSATOverview();
      res.status(200).json({ success: true, data: csatOverview });
    } catch (error) {
      next(error);
    }
  }
}