import { getRepository } from 'typeorm';
import { User } from '../entities/User';
import { Project } from '../entities/Project';
import { Task } from '../entities/Task';

export class UserProjectSummaryViewService {
  public async getUserProjectSummary(userId: string) {
    const userRepository = getRepository(User);
    const projectRepository = getRepository(Project);
    const taskRepository = getRepository(Task);

    // Fetch user details
    const user = await userRepository.findOne({ where: { id: userId }, relations: ['userRoles'] });

    // Fetch projects related to the user
    const projects = await projectRepository.find({ where: { owner: {id: userId } } });

    // Fetch user tasks
    const tasks = await taskRepository.find({ where: { assignedTo: {id: userId } } });

    // Summary including user roles and assigned tasks
    return {
      user,
      projects,
      tasks,
    };
  }
}