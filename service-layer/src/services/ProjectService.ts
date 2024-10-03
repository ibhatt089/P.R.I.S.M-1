import { getRepository } from 'typeorm';
import { Project } from '../entities/Project';
import { DeepPartial, UpdateResult } from 'typeorm';


/**
 * @class ProjectService
 * @description Service to handle project management operations such as creation, updating, deletion, etc.
 */
export class ProjectService {
  private projectRepository = getRepository(Project);

  public async createProject(projectData: DeepPartial<Project>): Promise<Project> {
    const project = this.projectRepository.create(projectData);
    return await this.projectRepository.save(project);
  }

  public async getProjectById(id: string): Promise<Project | undefined> {
    return await this.projectRepository.findOne({ where: { id }, relations: ['tasks', 'milestones', 'features', 'risks'] });
  }

  public async updateProject(id: string, projectData: Partial<Project>): Promise<UpdateResult> {
    return await this.projectRepository.update(id, projectData);
  }

  public async deleteProject(id: string): Promise<void> {
    await this.projectRepository.delete(id);
  }

  public async getAllProjects(): Promise<Project[]> {
    return await this.projectRepository.find({ relations: ['tasks', 'milestones', 'features', 'risks'] });
  }
}