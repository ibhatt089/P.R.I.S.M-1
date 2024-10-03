import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
  } from 'typeorm';
  import { Project } from './Project';
  
  /**
   * @class CSAT
   * @description Represents Customer Satisfaction (CSAT) scores for projects.
   */
  @Entity('csat')
  export class CSAT {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
  
    @ManyToOne(() => Project, (project) => project.csats)
    project!: Project; // Project for which the CSAT score is given
  
    @Column({ type: 'int', width: 1 })
    score!: number; // Customer satisfaction score (1-5)
  
    @Column({ type: 'text', nullable: true })
    feedback?: string; // Optional customer feedback
  
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at!: Date;
  }