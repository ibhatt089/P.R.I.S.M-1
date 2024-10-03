import { Request, Response, NextFunction } from 'express';
import { BaseController } from '../shared/BaseController';
import { EntityNotificationService } from '../services/EntityNotificationService';
import { HttpStatusCodes } from '../shared/constants/HttpStatusCodes';

export class EntityNotificationController extends BaseController {
  private entityNotificationService: EntityNotificationService;

  constructor() {
    super();
    this.entityNotificationService = new EntityNotificationService();
  }

  public async getNotificationById(req: Request, res: Response, next: NextFunction): Promise<void> {
    // Example: Get notification by ID
    const { id } = req.params;

    try {
      const notification = await this.entityNotificationService.getNotificationById(id);
      if (!notification) {
        this.sendError(res, new Error('Notification not found'), HttpStatusCodes.NOT_FOUND);
      } else {
        this.sendResponse(res, notification);
      }
    } catch (error) {
      next(error);
    }
  }

  public async createNotification(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const notificationData = req.body;
      const notification = await this.entityNotificationService.createNotification(notificationData);
      this.sendResponse(res, notification, HttpStatusCodes.CREATED);
    } catch (error) {
      next(error);
    }
  }

  public async markNotificationAsRead(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await this.entityNotificationService.markAsRead(id);
      this.sendResponse(res, { message: 'Notification marked as read' });
    } catch (error) {
      next(error);
    }
  }

  public async deleteNotification(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await this.entityNotificationService.deleteNotification(id);
      this.sendResponse(res, { message: 'Notification deleted successfully' }, HttpStatusCodes.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  }
}