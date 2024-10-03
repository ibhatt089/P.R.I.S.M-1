import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Project } from './Project';

/**
 * @class Feature
 * @description Represents a feature of a project.
 */
@Entity('features')
export class Feature {

  @PrimaryGeneratedColumn('uuid')
  id!: string; // Unique identifier for each feature

  @Column({ type: 'varchar', length: 100, unique: true })
  feature_id!: string; // User-friendly alphanumeric feature ID

  @Column({ type: 'varchar', length: 100 })
  title!: string; // Feature title

  @Column({ type: 'text', nullable: true })
  description?: string; // Optional feature description

  @ManyToOne(() => Project, (project) => project.features)
  project!: Project; // Project to which the feature belongs

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date; // Timestamp for feature creation

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at!: Date; // Timestamp for the latest feature update
}