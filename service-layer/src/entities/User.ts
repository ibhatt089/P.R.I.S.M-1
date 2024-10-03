import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinTable,
  ManyToMany,
} from 'typeorm';

import { Project } from './Project';
import { SecurityAnswer } from './SecurityAnswer';
import { Task } from './Task';
import { Milestone } from './Milestone';
import { Risk } from './Risk';
import { ResourceAllocation } from './ResourceAllocation';
import { Role } from './Role';
import { AuditLog } from './AuditLog';

/**
 * @class User
 * @description Represents a user of the system.
 */
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  userId!: string;

  @Column({ type: 'varchar', length: 50 })
  firstName!: string;

  @Column({ type: 'varchar', length: 50 })
  lastName!: string;

  @Column({ type: 'varchar', unique: true })
  email!: string;

  @Column({ type: 'text', default: '' })
  password!: string;

  @Column({ type: 'varchar', length: 50 })
  designation!: string;

  @Column({ type: 'boolean', default: true })
  isActive!: boolean;

  @Column({ type: 'int', default: 0 })
  failedLoginAttempts!: number; // Number of failed login attempts

  @Column({ type: 'boolean', default: false })
  isLocked!: boolean; // Indicates if the user is locked due to failed login attempts

  @OneToMany(() => Project, project => project.owner)
  ownedProjects!: Project[];

  // Relationships
  @ManyToMany(() => Role)
  @JoinTable()
  roles!: Role[]; // User roles, linked to the Role entity

  @OneToMany(() => SecurityAnswer, securityAnswer => securityAnswer.user)
  securityAnswers!: SecurityAnswer[]; // Security answers provided by the user

  @OneToMany(() => Task, task => task.assignedTo)
  assignedTasks!: Task[]; // Tasks assigned to the user within their allocated projects

  @OneToMany(() => Milestone, milestone => milestone.assignedTo)
  assignedMilestones!: Milestone[]; // Milestones assigned to the user within their allocated projects

  @OneToMany(() => Risk, risk => risk.assignedTo)
  assignedRisks!: Risk[]; // Risks assigned to the user within their allocated projects

  @OneToMany(() => ResourceAllocation, resource => resource.user)
  resourceAllocations!: ResourceAllocation[]; // Resources allocated for user-specific projects

  @OneToMany(() => AuditLog, auditLog => auditLog.user)
  auditLogs!: AuditLog[]; // Actions performed by the user

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt!: Date;
}
