import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
  } from 'typeorm';
  import { Role } from './Role';
  
  /**
   * @class Permission
   * @description Represents permissions assigned to different roles.
   */
  @Entity('permissions')
  export class Permission {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
  
    @ManyToOne(() => Role, (role) => role.permissions)
    role!: Role; // Role to which the permission is assigned
  
    @Column({ type: 'varchar', length: 100 })
    entity!: string; // Entity for which the permission is granted (e.g., 'project', 'task')
  
    @Column({ type: 'varchar', length: 50 })
    action!: string; // Action allowed (e.g., 'create', 'edit', 'delete')
  
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at!: Date;
  }