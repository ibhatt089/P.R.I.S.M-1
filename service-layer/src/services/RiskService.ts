import { getRepository } from 'typeorm';
import { Risk } from '../entities/Risk';

/**
 * @class RiskService
 * @description Handles business logic related to risks, such as creation, retrieval, updating, and deletion.
 */
export class RiskService {
  private riskRepository = getRepository(Risk);

  /**
   * @method getRiskById
   * @description Retrieves a risk by its ID.
   * @param {string} id - The ID of the risk.
   * @returns {Promise<Risk | null>} - The found risk or null if not found.
   */
  public async getRiskById(id: string): Promise<Risk | undefined> {
    return await this.riskRepository.findOne({ where: { id } });
  }

  /**
   * @method createRisk
   * @description Creates a new risk.
   * @param {Partial<Risk>} riskData - The data to create the risk.
   * @returns {Promise<Risk>} - The newly created risk.
   */
  public async createRisk(riskData: Partial<Risk>): Promise<Risk> {
    const newRisk = this.riskRepository.create(riskData);
    return await this.riskRepository.save(newRisk);
  }

  /**
   * @method updateRisk
   * @description Updates an existing risk.
   * @param {string} id - The ID of the risk to update.
   * @param {Partial<Risk>} updateData - The new data for the risk.
   * @returns {Promise<Risk>} - The updated risk.
   */
  public async updateRisk(id: string, updateData: Partial<Risk>): Promise<Risk | undefined> {
    await this.riskRepository.update(id, updateData);
    return await this.getRiskById(id);
  }

  /**
   * @method deleteRisk
   * @description Deletes a risk by its ID.
   * @param {string} id - The ID of the risk to delete.
   * @returns {Promise<void>} - Resolves when the risk has been deleted.
   */
  public async deleteRisk(id: string): Promise<void> {
    await this.riskRepository.delete(id);
  }
}