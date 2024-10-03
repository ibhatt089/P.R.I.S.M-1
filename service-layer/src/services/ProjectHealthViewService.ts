import { getRepository } from 'typeorm';
import { Project } from '../entities/Project';
import { Task } from '../entities/Task';
import { Milestone } from '../entities/Milestone';
import { Risk } from '../entities/Risk';

export class ProjectHealthViewService {
  public async getProjectHealth(projectId: string) {
    const projectRepository = getRepository(Project);
    const taskRepository = getRepository(Task);
    const milestoneRepository = getRepository(Milestone);
    const riskRepository = getRepository(Risk);

    // Fetch project details
    const project = await projectRepository.findOne({ where: { id: projectId } });

    // Fetch related data (tasks, milestones, risks)
    const tasks = await taskRepository.find({ where: { project: { id: projectId } } });
    const milestones = await milestoneRepository.find({ where: { project: { id: projectId } } });
    const risks = await riskRepository.find({ where: { project: { id: projectId } } });

    // Calculate metrics for project health
    const completedTasks = tasks.filter(task => task.status.name === 'Completed').length;
    const upcomingMilestones = milestones.filter(milestone => milestone.due_date > new Date()).length;
    const openRisks = risks.filter(risk => risk.status === 'open').length;

    return {
      project,
      completedTasks,
      upcomingMilestones,
      openRisks
    };
  }
}