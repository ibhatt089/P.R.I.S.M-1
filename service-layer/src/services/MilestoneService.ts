import { getRepository } from 'typeorm';
import { Milestone } from '../entities/Milestone';

/**
 * @class MilestoneService
 * @description Handles business logic related to milestones, such as creation, retrieval, updating, and deletion.
 */
export class MilestoneService {
  private milestoneRepository = getRepository(Milestone);

  /**
   * @method getMilestoneById
   * @description Retrieves a milestone by its ID.
   * @param {string} id - The ID of the milestone.
   * @returns {Promise<Milestone | null>} - The found milestone or null if not found.
   */
  public async getMilestoneById(id: string): Promise<Milestone | undefined> {
    return await this.milestoneRepository.findOne({ where: { id } });
  }

  /**
   * @method createMilestone
   * @description Creates a new milestone.
   * @param {Partial<Milestone>} milestoneData - The data to create the milestone.
   * @returns {Promise<Milestone>} - The newly created milestone.
   */
  public async createMilestone(milestoneData: Partial<Milestone>): Promise<Milestone> {
    const newMilestone = this.milestoneRepository.create(milestoneData);
    return await this.milestoneRepository.save(newMilestone);
  }

  /**
   * @method updateMilestone
   * @description Updates an existing milestone.
   * @param {string} id - The ID of the milestone to update.
   * @param {Partial<Milestone>} updateData - The new data for the milestone.
   * @returns {Promise<Milestone>} - The updated milestone.
   */
  public async updateMilestone(id: string, updateData: Partial<Milestone>): Promise<Milestone | undefined> {
    await this.milestoneRepository.update(id, updateData);
    return await this.getMilestoneById(id);
  }

  /**
   * @method deleteMilestone
   * @description Deletes a milestone by its ID.
   * @param {string} id - The ID of the milestone to delete.
   * @returns {Promise<void>} - Resolves when the milestone has been deleted.
   */
  public async deleteMilestone(id: string): Promise<void> {
    await this.milestoneRepository.delete(id);
  }
}