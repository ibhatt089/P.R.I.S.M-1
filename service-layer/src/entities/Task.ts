import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

import { Project } from './Project';
import { User } from './User';
import { TaskStatus } from './TaskStatus';

/**
 * @class Task
 * @description Represents a task within a project.
 */
@Entity('tasks')
export class Task {

  @PrimaryGeneratedColumn('uuid')
  id!: string; // Unique identifier for each task

  @Column({ type: 'varchar', length: 100, unique: true })
  task_id!: string; // User-friendly alphanumeric task ID

  @Column({ type: 'varchar', length: 100 })
  title!: string; // Task title

  @Column({ type: 'text', nullable: true })
  description?: string; // Optional task description

  @ManyToOne(() => TaskStatus, { eager: true })
  status!: TaskStatus; // Status key for the task

  @ManyToOne(() => User, { nullable: true })
  assigned_to_user?: User; // User assigned to this task

  @ManyToOne(() => Project, (project) => project.tasks)
  project!: Project; // Project to which the task belongs

  @ManyToOne(() => User, (user) => user.assignedTasks)
  assignedTo!: User; // User assigned to the task

  @Column({ type: 'date', nullable: true })
  due_date?: Date; // Due date for the task

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;// Timestamp for task creation

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at!: Date; // Timestamp for the latest task update
}