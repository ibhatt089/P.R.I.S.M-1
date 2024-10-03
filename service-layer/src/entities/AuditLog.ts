import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
  } from 'typeorm';
  import { User } from './User';
  
  /**
   * @class AuditLog
   * @description Represents an audit log entry for user actions.
   */
  @Entity('audit_logs')
  export class AuditLog {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
  
    @ManyToOne(() => User, (user) => user.auditLogs, { eager: true })
    user!: User; // User who performed the action
  
    @Column({ type: 'varchar', length: 100 })
    action!: string; // Action performed
  
    @Column({ type: 'varchar', length: 100 })
    entity!: string; // Entity involved in the action
  
    @Column({ type: 'text', nullable: true })
    description?: string; // Description of the action
  
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    timestamp!: Date; // Timestamp when the action was performed
  }