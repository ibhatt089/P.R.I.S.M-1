import { getRepository } from 'typeorm';
import { ResourceAllocation } from '../entities/ResourceAllocation';
import { User } from '../entities/User';
import { Project } from '../entities/Project';

export class ResourceAllocationService {
  private repository = getRepository(ResourceAllocation);
  private userRepository = getRepository(User);
  private projectRepository = getRepository(Project);

  public async allocateResource(data: Partial<ResourceAllocation>): Promise<ResourceAllocation> {
    const resourceAllocation = this.repository.create(data);
    return await this.repository.save(resourceAllocation);
  }

  public async getAllocationById(id: string): Promise<ResourceAllocation | undefined> {
    return await this.repository.findOne({ where: { id }, relations: ['user', 'project'] });
  }

  public async updateAllocation(id: string, data: Partial<ResourceAllocation>): Promise<ResourceAllocation | undefined> {
    await this.repository.update(id, data);
    return await this.getAllocationById(id);
  }

  public async deleteAllocation(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  public async listAllocations(): Promise<ResourceAllocation[]> {
    return await this.repository.find({ relations: ['user', 'project'] });
  }

  public async validateUserAllocation(userId: string, projectId: string): Promise<boolean> {
    const allocation = await this.repository.findOne({ where: { user: { id: userId }, project: { id: projectId } } });
    return !!allocation;
  }
}