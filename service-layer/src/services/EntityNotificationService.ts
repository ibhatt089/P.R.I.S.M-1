import { getRepository } from 'typeorm';
import { EntityNotification } from '../entities/EntityNotification';

export class EntityNotificationService {
  private repository = getRepository(EntityNotification);

  public async getNotificationById(id: string): Promise<EntityNotification | undefined> {
    return await this.repository.findOne({ where: { id } });
  }

  public async createNotification(data: Partial<EntityNotification>): Promise<EntityNotification> {
    const notification = this.repository.create(data);
    return await this.repository.save(notification);
  }

  public async markAsRead(notificationId: string): Promise<void> {
    await this.repository.update(notificationId, { is_read: true });
  }

  public async deleteNotification(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}