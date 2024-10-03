import { Request, Response, NextFunction } from 'express';
import { BaseController } from '../shared/BaseController';
import { RiskService } from '../services/RiskService';
import { HttpStatusCodes } from '../shared/constants/HttpStatusCodes';

/**
 * @class RiskController
 * @description Controller to handle risk-related requests.
 */
export class RiskController extends BaseController {
  private riskService: RiskService;

  constructor() {
    super();
    this.riskService = new RiskService();
  }

  /**
   * @method getRiskById
   * @description Retrieves a risk by its ID.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @param {NextFunction} next - Express next middleware function.
   */
  public async getRiskById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const risk = await this.riskService.getRiskById(id);
      if (!risk) {
        this.sendError(res, new Error('Risk not found'), HttpStatusCodes.NOT_FOUND);
        return;
      }
      this.sendResponse(res, risk);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @method createRisk
   * @description Creates a new risk.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @param {NextFunction} next - Express next middleware function.
   */
  public async createRisk(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const riskData = req.body;
      const risk = await this.riskService.createRisk(riskData);
      this.sendResponse(res, risk, HttpStatusCodes.CREATED);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @method updateRisk
   * @description Updates an existing risk by its ID.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @param {NextFunction} next - Express next middleware function.
   */
  public async updateRisk(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const updatedRisk = await this.riskService.updateRisk(id, updateData);
      this.sendResponse(res, updatedRisk);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @method deleteRisk
   * @description Deletes a risk by its ID.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @param {NextFunction} next - Express next middleware function.
   */
  public async deleteRisk(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await this.riskService.deleteRisk(id);
      this.sendResponse(res, { message: 'Risk deleted successfully' }, HttpStatusCodes.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  }
}