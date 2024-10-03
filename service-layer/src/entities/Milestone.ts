import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
  } from 'typeorm';
  import { Project } from './Project';
  import { User } from './User';
  import { MilestoneStatus } from './MilestoneStatus';
  
  /**
   * @class Milestone
   * @description Represents a milestone in a project.
   */
  @Entity('milestones')
  export class Milestone {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
  
    @Column({ type: 'varchar', length: 100, unique: true })
    milestone_id!: string; // User-friendly alphanumeric milestone ID
  
    @Column({ type: 'varchar', length: 100 })
    title!: string; // Milestone title
  
    @Column({ type: 'text', nullable: true })
    description?: string; // Optional milestone description
  
    @ManyToOne(() => MilestoneStatus, { eager: true })
    status!: MilestoneStatus; // Status of the milestone
  
    @ManyToOne(() => Project, (project) => project.milestones)
    project!: Project; // Project to which the milestone belongs
  
    @ManyToOne(() => User, (user) => user.assignedMilestones, { nullable: true })
    assignedTo?: User; // User responsible for achieving the milestone
  
    @Column({ type: 'date' })
    due_date!: Date; // Due date for the milestone
  
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at!: Date;
  
    @UpdateDateColumn({
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
      onUpdate: 'CURRENT_TIMESTAMP',
    })
    updated_at!: Date;
  }