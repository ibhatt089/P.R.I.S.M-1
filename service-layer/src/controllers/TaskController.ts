import { Request, Response, NextFunction } from 'express';
import { BaseController } from '../shared/BaseController';
import { TaskService } from '../services/TaskService';
import { HttpStatusCodes } from '../shared/constants/HttpStatusCodes';

/**
 * @class TaskController
 * @description Controller to handle task-related requests. Extends BaseController to utilize common request handling, error management, and response formatting.
 */
export class TaskController extends BaseController {
  private taskService: TaskService;

  constructor() {
    super();
    this.taskService = new TaskService();
  }

  /**
   * @method getTaskById
   * @description Retrieves a task by its ID.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @param {NextFunction} next - Express next middleware function.
   */
  public async getTaskById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const task = await this.taskService.getTaskById(id);
      if (!task) {
        this.sendError(res, new Error('Task not found'), HttpStatusCodes.NOT_FOUND);
        return;
      }
      this.sendResponse(res, task);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @method createTask
   * @description Creates a new task.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @param {NextFunction} next - Express next middleware function.
   */
  public async createTask(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const taskData = req.body;
      const task = await this.taskService.createTask(taskData);
      this.sendResponse(res, task, HttpStatusCodes.CREATED);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @method updateTask
   * @description Updates an existing task by its ID.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @param {NextFunction} next - Express next middleware function.
   */
  public async updateTask(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const updatedTask = await this.taskService.updateTask(id, updateData);
      this.sendResponse(res, updatedTask);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @method deleteTask
   * @description Deletes a task by its ID.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @param {NextFunction} next - Express next middleware function.
   */
  public async deleteTask(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await this.taskService.deleteTask(id);
      this.sendResponse(res, { message: 'Task deleted successfully' }, HttpStatusCodes.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  }
}