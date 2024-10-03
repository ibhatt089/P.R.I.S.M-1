import { getRepository, UpdateResult } from 'typeorm';
import { Feature } from '../entities/Feature';

export class FeatureService {
  private repository = getRepository(Feature);

  public async getFeatureById(id: string): Promise<Feature | undefined> {
    return await this.repository.findOne({ where: { id } });
  }

  public async createFeature(data: Partial<Feature>): Promise<Feature> {
    const feature = this.repository.create(data);
    return await this.repository.save(feature);
  }

  public async updateFeature(id: string, data: Partial<Feature>): Promise<Feature | undefined> {
    await this.repository.update(id, data);
    return await this.getFeatureById(id);
  }

  public async deleteFeature(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}