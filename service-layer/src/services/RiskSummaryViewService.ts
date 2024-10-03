import { getRepository } from 'typeorm';
import { Risk } from '../entities/Risk';
import { Project } from '../entities/Project';

export class RiskSummaryViewService {
  public async getRiskSummary() {
    const riskRepository = getRepository(Risk);

    // Fetch all risks
    const risks = await riskRepository.find({ relations: ['project'] });

    // Summary of risks including severity and status
    const openRisks = risks.filter(risk => risk.status === 'open').length;
    const mitigatedRisks = risks.filter(risk => risk.status === 'closed').length;

    return {
      totalRisks: risks.length,
      openRisks,
      mitigatedRisks,
      risks,
    };
  }
}