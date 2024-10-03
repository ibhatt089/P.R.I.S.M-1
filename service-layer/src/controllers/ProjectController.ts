import { Request, Response, NextFunction } from 'express';
import { BaseController } from '../shared/BaseController';
import { ProjectService } from '../services/ProjectService';
import { HttpStatusCodes } from '../shared/constants/HttpStatusCodes';
import { ErrorMessages } from '../shared/constants/ErrorMessages';

/**
 * @class ProjectController
 * @description Controller to handle project management-related requests.
 */
export class ProjectController extends BaseController {
  private projectService: ProjectService;

  constructor() {
    super();
    this.projectService = new ProjectService();
  }

  /**
   * @method createProject
   * @description Handles the creation of a new project.
   */
  public async createProject(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const project = await this.projectService.createProject(req.body);
      this.sendResponse(res, project, HttpStatusCodes.CREATED);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @method getProjectById
   * @description Retrieves a project by its ID.
   */
  public async getProjectById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const project = await this.projectService.getProjectById(id);
      if (!project) {
        this.sendError(res, new Error(ErrorMessages.RESOURCE_NOT_FOUND_ERROR_MSG), HttpStatusCodes.NOT_FOUND);
      }
      this.sendResponse(res, project);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @method updateProject
   * @description Handles the update of a project.
   */
  public async updateProject(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const updatedProject = await this.projectService.updateProject(id, req.body);
      this.sendResponse(res, updatedProject);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @method deleteProject
   * @description Handles the deletion of a project.
   */
  public async deleteProject(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await this.projectService.deleteProject(id);
      this.sendResponse(res, { message: 'Project deleted successfully' }, HttpStatusCodes.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @method getAllProjects
   * @description Retrieves all projects.
   */
  public async getAllProjects(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const projects = await this.projectService.getAllProjects();
      this.sendResponse(res, projects);
    } catch (error) {
      next(error);
    }
  }
}