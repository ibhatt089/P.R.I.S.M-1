import { Request, Response, NextFunction } from 'express';
import { RiskSummaryViewService } from '../services/RiskSummaryViewService';

export class RiskSummaryViewController {
  private riskSummaryViewService: RiskSummaryViewService;

  constructor() {
    this.riskSummaryViewService = new RiskSummaryViewService();
  }

  public async getRiskSummary(req: Request, res: Response, next: NextFunction) {
    try {
      const riskSummary = await this.riskSummaryViewService.getRiskSummary();
      res.status(200).json({ success: true, data: riskSummary });
    } catch (error) {
      next(error);
    }
  }
}