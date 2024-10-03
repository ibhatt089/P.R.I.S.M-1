import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { User } from './User';
import { ProjectStatus } from './ProjectStatus';
import { Milestone } from './Milestone';
import { Feature } from './Feature';
import { Risk } from './Risk';
import { Task } from './Task';
import { ResourceAllocation } from './ResourceAllocation';
import { CSAT } from './CSAT';

/**
 * @class Project
 * @description Represents a project in the system.
 */
@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  projectId!: string; // User-friendly alphanumeric project ID

  @Column({ type: 'varchar', length: 100 })
  name!: string; // Project name

  @Column({ type: 'text', nullable: true })
  description?: string; // Optional description of the project

  @ManyToOne(() => ProjectStatus, { eager: true })
  status!: ProjectStatus; // Relationship with the project status

  @ManyToOne(() => User, user => user.ownedProjects, { eager: true })
  owner!: User; // Owner of the project, strict ownership enforced

  @OneToMany(() => Milestone, milestone => milestone.project)
  milestones!: Milestone[]; // Milestones associated with the project

  @OneToMany(() => Feature, feature => feature.project)
  features!: Feature[]; // Features associated with the project

  @OneToMany(() => Risk, risk => risk.project)
  risks!: Risk[]; // Risks associated with the project

  @OneToMany(() => Task, task => task.project)
  tasks!: Task[]; // Tasks associated with the project

  @OneToMany(() => ResourceAllocation, resource => resource.project)
  resources!: ResourceAllocation[]; // Resources allocated to the project

  @OneToMany(() => CSAT, csat => csat.project)
  csats!: CSAT[]; // CSAT scores linked to the project

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date; // Timestamp for project creation

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt!: Date; // Timestamp for the latest project update
}
