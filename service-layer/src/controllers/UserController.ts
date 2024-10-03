import { Request, Response, NextFunction } from 'express';
import { BaseController } from '../shared/BaseController';
import { UserService } from '../services/UserService';
import { HttpStatusCodes } from '../shared/constants/HttpStatusCodes';

export class UserController extends BaseController {
  private userService: UserService;

  constructor() {
    super();
    this.userService = new UserService();
  }

  public async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;

    try {
      const user = await this.userService.getUserById(id);
      if (!user) {
        this.sendError(res, new Error('User not found'), HttpStatusCodes.NOT_FOUND);
      } else {
        this.sendResponse(res, user);
      }
    } catch (error) {
      next(error);
    }
  }

  public async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userData = req.body;
      const user = await this.userService.createUser(userData);
      this.sendResponse(res, user, HttpStatusCodes.CREATED);
    } catch (error) {
      next(error);
    }
  }

  public async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const updatedUser = await this.userService.updateUser(id, updateData);
      this.sendResponse(res, updatedUser);
    } catch (error) {
      next(error);
    }
  }

  public async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await this.userService.deleteUser(id);
      this.sendResponse(res, { message: 'User deleted successfully' }, HttpStatusCodes.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  }

  public async listUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const users = await this.userService.listUsers();
      this.sendResponse(res, users);
    } catch (error) {
      next(error);
    }
  }

  public async addSecurityAnswers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId } = req.params;
      const securityAnswers = req.body.answers;
      const savedAnswers = await this.userService.addSecurityAnswers(userId, securityAnswers);
      this.sendResponse(res, savedAnswers, HttpStatusCodes.CREATED);
    } catch (error) {
      next(error);
    }
  }

  public async updatePassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId } = req.params;
      const { newPassword } = req.body;
      await this.userService.updatePassword(userId, newPassword);
      this.sendResponse(res, { message: 'Password updated successfully' });
    } catch (error) {
      next(error);
    }
  }

  public async resetPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId } = req.params;
      const { securityAnswers, newPassword } = req.body;
      await this.userService.resetPassword(userId, securityAnswers, newPassword);
      this.sendResponse(res, { message: 'Password reset successfully' });
    } catch (error) {
      next(error);
    }
  }

  public async unlockUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId } = req.params;
      await this.userService.unlockUser(userId);
      this.sendResponse(res, { message: 'User unlocked successfully' });
    } catch (error) {
      next(error);
    }
  }

  public async activateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId } = req.params;
      await this.userService.activateUser(userId);
      this.sendResponse(res, { message: 'User activated successfully' });
    } catch (error) {
      next(error);
    }
  }
}