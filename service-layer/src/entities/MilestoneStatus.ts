import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

/**
 * @class MilestoneStatus
 * @description Defines predefined milestone statuses.
 */
@Entity('milestone_status')
export class MilestoneStatus {

  @PrimaryGeneratedColumn('uuid')
  id!: string; // Unique identifier for each status

  @Column({ type: 'varchar', length: 50, unique: true })
  name!: string; // Status name (e.g., In Progress, Completed)

  @Column({ type: 'text', nullable: true })
  description?: string; // Description of the status
}