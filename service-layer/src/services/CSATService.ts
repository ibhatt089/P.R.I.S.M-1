import { getRepository, UpdateResult } from 'typeorm';
import { CSAT } from '../entities/CSAT';

export class CSATService {
  private repository = getRepository(CSAT);

  public async getCSATById(id: string): Promise<CSAT | undefined> {
    return await this.repository.findOne({ where: { id } });
  }

  public async createCSAT(data: Partial<CSAT>): Promise<CSAT> {
    const csat = this.repository.create(data);
    return await this.repository.save(csat);
  }

  public async updateCSAT(id: string, data: Partial<CSAT>): Promise<CSAT | undefined> {
    await this.repository.update(id, data);
    return await this.getCSATById(id);
  }

  public async deleteCSAT(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}