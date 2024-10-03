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
  
  /**
   * @class Risk
   * @description Represents a risk within a project.
   */
  @Entity('risks')
  export class Risk {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
  
    @Column({ type: 'varchar', length: 100, unique: true })
    risk_id!: string; // User-friendly alphanumeric risk ID
  
    @Column({ type: 'varchar', length: 100 })
    title!: string; // Risk title
  
    @Column({ type: 'text', nullable: true })
    description?: string; // Optional risk description
  
    @Column({ type: 'enum', enum: ['low', 'medium', 'high'], default: 'low' })
    severity!: 'low' | 'medium' | 'high'; // Severity of the risk
  
    @Column({ type: 'enum', enum: ['open', 'closed'], default: 'open' })
    status!: 'open' | 'closed'; // Risk status
  
    @ManyToOne(() => Project, (project) => project.risks)
    project!: Project; // Project to which the risk belongs
  
    @ManyToOne(() => User, (user) => user.assignedRisks, { nullable: true })
    assignedTo?: User; // User responsible for mitigating the risk
  
    @Column({ type: 'text', nullable: true })
    mitigation_plan?: string; // Optional mitigation plan for the risk
  
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at!: Date;
  
    @UpdateDateColumn({
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
      onUpdate: 'CURRENT_TIMESTAMP',
    })
    updated_at!: Date;
  }