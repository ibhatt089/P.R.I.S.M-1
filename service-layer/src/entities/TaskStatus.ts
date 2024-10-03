import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


/**
 * @class TaskStatus
 * @description Defines predefined task statuses.
 */
@Entity('task_status')
export class TaskStatus {

  @PrimaryGeneratedColumn('uuid')
  id!: string; // Unique identifier for each status

  @Column({ type: 'varchar', length: 50, unique: true })
  name!: string; // Status name (e.g., In Progress, Completed)

  @Column({ type: 'text', nullable: true })
  description?: string; // Description of the status
}