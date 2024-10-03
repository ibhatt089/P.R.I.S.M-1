import { Request, Response, NextFunction } from 'express';
import { BaseController } from '../shared/BaseController';
import { ResourceAllocationService } from '../services/ResourceAllocationService';
import { HttpStatusCodes } from '../shared/constants/HttpStatusCodes';

export class ResourceAllocationController extends BaseController {
  private resourceAllocationService: ResourceAllocationService;

  constructor() {
    super();
    this.resourceAllocationService = new ResourceAllocationService();
  }

  public async getAllocationById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;

    try {
      const allocation = await this.resourceAllocationService.getAllocationById(id);
      if (!allocation) {
        this.sendError(res, new Error('Resource Allocation not found'), HttpStatusCodes.NOT_FOUND);
      } else {
        this.sendResponse(res, allocation);
      }
    } catch (error) {
      next(error);
    }
  }

  public async createAllocation(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const allocationData = req.body;
      const allocation = await this.resourceAllocationService.allocateResource(allocationData);
      this.sendResponse(res, allocation, HttpStatusCodes.CREATED);
    } catch (error) {
      next(error);
    }
  }

  public async updateAllocation(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const updatedAllocation = await this.resourceAllocationService.updateAllocation(id, updateData);
      this.sendResponse(res, updatedAllocation);
    } catch (error) {
      next(error);
    }
  }

  public async deleteAllocation(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await this.resourceAllocationService.deleteAllocation(id);
      this.sendResponse(res, { message: 'Resource Allocation deleted successfully' }, HttpStatusCodes.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  }

  public async listAllocations(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const allocations = await this.resourceAllocationService.listAllocations();
      this.sendResponse(res, allocations);
    } catch (error) {
      next(error);
    }
  }
}