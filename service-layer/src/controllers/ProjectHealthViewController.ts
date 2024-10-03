import { Request, Response, NextFunction } from 'express';
import { ProjectHealthViewService } from '../services/ProjectHealthViewService';

export class ProjectHealthViewController {
  private projectHealthViewService: ProjectHealthViewService;

  constructor() {
    this.projectHealthViewService = new ProjectHealthViewService();
  }

  public async getProjectHealth(req: Request, res: Response, next: NextFunction) {
    try {
      const { projectId } = req.params;
      const projectHealth = await this.projectHealthViewService.getProjectHealth(projectId);
      res.status(200).json({ success: true, data: projectHealth });
    } catch (error) {
      next(error);
    }
  }
}