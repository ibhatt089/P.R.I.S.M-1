import { Request, Response, NextFunction } from 'express';
import { BaseController } from '../shared/BaseController';
import { CSATService } from '../services/CSATService';
import { HttpStatusCodes } from '../shared/constants/HttpStatusCodes';

export class CSATController extends BaseController {
  private csatService: CSATService;

  constructor() {
    super();
    this.csatService = new CSATService();
  }

  public async getCSATById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;

    try {
      const csat = await this.csatService.getCSATById(id);
      if (!csat) {
        this.sendError(res, new Error('CSAT not found'), HttpStatusCodes.NOT_FOUND);
        return;
      }
      this.sendResponse(res, csat);
    } catch (error) {
      next(error);
    }
  }

  public async createCSAT(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const csatData = req.body;
      const csat = await this.csatService.createCSAT(csatData);
      this.sendResponse(res, csat, HttpStatusCodes.CREATED);
    } catch (error) {
      next(error);
    }
  }

  public async updateCSAT(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    const updateData = req.body;

    try {
      const updatedCSAT = await this.csatService.updateCSAT(id, updateData);
      if (!updatedCSAT) {
        this.sendError(res, new Error('CSAT not found'), HttpStatusCodes.NOT_FOUND);
        return;
      }
      this.sendResponse(res, updatedCSAT);
    } catch (error) {
      next(error);
    }
  }

  public async deleteCSAT(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;

    try {
      await this.csatService.deleteCSAT(id);
      this.sendResponse(res, { message: 'CSAT deleted successfully' }, HttpStatusCodes.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  }
}