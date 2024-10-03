import { Request, Response, NextFunction } from 'express';
import { BaseController } from '../shared/BaseController';
import { FeatureService } from '../services/FeatureService';
import { HttpStatusCodes } from '../shared/constants/HttpStatusCodes';

export class FeatureController extends BaseController {
  private featureService: FeatureService;

  constructor() {
    super();
    this.featureService = new FeatureService();
  }

  public async getFeatureById(req: Request, res: Response, next: NextFunction): Promise<void> {
    // Example: Get feature by ID
    const { id } = req.params;

    try {
      const feature = await this.featureService.getFeatureById(id);
      if (!feature) {
        this.sendError(res, new Error('Feature not found'), HttpStatusCodes.NOT_FOUND);
      } else {
        this.sendResponse(res, feature);
      }
    } catch (error) {
      next(error);
    }
  }

  public async createFeature(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const featureData = req.body;
      const feature = await this.featureService.createFeature(featureData);
      this.sendResponse(res, feature, HttpStatusCodes.CREATED);
    } catch (error) {
      next(error);
    }
  }

  public async updateFeature(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const updatedFeature = await this.featureService.updateFeature(id, updateData);
      this.sendResponse(res, updatedFeature);
    } catch (error) {
      next(error);
    }
  }

  public async deleteFeature(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await this.featureService.deleteFeature(id);
      this.sendResponse(res, { message: 'Feature deleted successfully' }, HttpStatusCodes.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  }
}