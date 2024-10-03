import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
  } from 'typeorm';

  import { User } from './User';
  import { Project } from './Project';
  
  /**
   * @class ResourceAllocation
   * @description Represents the allocation of a resource (user) to a project.
   */
  @Entity('resource_allocations')
  export class ResourceAllocation {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
  
    @ManyToOne(() => User, (user) => user.resourceAllocations)
    user!: User; // User being allocated
  
    @ManyToOne(() => Project, (project) => project.resources)
    project!: Project; // Project to which the user is allocated
  
    @Column({ type: 'int' })
    allocation_percentage!: number; // Percentage of the user's time allocated to the project
  
    @Column({ type: 'date' })
    start_date!: Date; // Start date of allocation
  
    @Column({ type: 'date', nullable: true })
    end_date?: Date; // Optional end date of allocation
  
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at!: Date;
  }