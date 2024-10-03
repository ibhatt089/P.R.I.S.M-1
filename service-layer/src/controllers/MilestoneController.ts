import { Request, Response, NextFunction } from 'express';
import { BaseController } from '../shared/BaseController';
import { MilestoneService } from '../services/MilestoneService';
import { HttpStatusCodes } from '../shared/constants/HttpStatusCodes';

/**
 * @class MilestoneController
 * @description Controller to handle milestone-related requests.
 */
export class MilestoneController extends BaseController {
  private milestoneService: MilestoneService;

  constructor() {
    super();
    this.milestoneService = new MilestoneService();
  }

  /**
   * @method getMilestoneById
   * @description Retrieves a milestone by its ID.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @param {NextFunction} next - Express next middleware function.
   */
  public async getMilestoneById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const milestone = await this.milestoneService.getMilestoneById(id);
      if (!milestone) {
        this.sendError(res, new Error('Milestone not found'), HttpStatusCodes.NOT_FOUND);
        return;
      }
      this.sendResponse(res, milestone);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @method createMilestone
   * @description Creates a new milestone.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @param {NextFunction} next - Express next middleware function.
   */
  public async createMilestone(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const milestoneData = req.body;
      const milestone = await this.milestoneService.createMilestone(milestoneData);
      this.sendResponse(res, milestone, HttpStatusCodes.CREATED);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @method updateMilestone
   * @description Updates an existing milestone by its ID.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @param {NextFunction} next - Express next middleware function.
   */
  public async updateMilestone(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const updatedMilestone = await this.milestoneService.updateMilestone(id, updateData);
      this.sendResponse(res, updatedMilestone);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @method deleteMilestone
   * @description Deletes a milestone by its ID.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @param {NextFunction} next - Express next middleware function.
   */
  public async deleteMilestone(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await this.milestoneService.deleteMilestone(id);
      this.sendResponse(res, { message: 'Milestone deleted successfully' }, HttpStatusCodes.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  }
}