import { getRepository } from 'typeorm';
import { CSAT } from '../entities/CSAT';
import { Project } from '../entities/Project';

export class CSATOverviewViewService {
  public async getCSATOverview() {
    const csatRepository = getRepository(CSAT);
    const projectRepository = getRepository(Project);

    // Fetch all CSAT scores
    const csatRecords = await csatRepository.find({ relations: ['project'] });

    // Calculate average score and trend
    const averageScore = csatRecords.reduce((sum, record) => sum + record.score, 0) / csatRecords.length;

    return {
      totalRecords: csatRecords.length,
      averageScore,
      csatRecords,
    };
  }
}