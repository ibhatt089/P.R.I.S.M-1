import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('entity_notification')
export class EntityNotification {
  @PrimaryGeneratedColumn('uuid')
  id!: string; // Unique identifier for the notification

  @Column({ type: 'varchar' })
  entity_type!: string; // Type of entity (e.g., 'user', 'project', 'task')

  @Column({ type: 'uuid' })
  entity_id!: string; // The ID of the entity the notification belongs to

  @Column({ type: 'text' })
  message!: string; // Notification message

  @Column({ type: 'varchar' })
  type!: string; // Type of notification (e.g., 'task_assignment', 'risk_alert')

  @Column({ type: 'boolean', default: false })
  is_read!: boolean; // Whether the notification has been read

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date; // Timestamp when the notification was created

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at!: Date; // Timestamp when the notification was updated
}