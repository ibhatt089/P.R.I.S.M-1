import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
  } from 'typeorm';
  
  import { User } from './User';
  import { Role } from './Role';
  
  /**
   * @class UserRole
   * @description Represents a user's assigned roles.
   */
  @Entity('user_roles')
  export class UserRole {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
  
    @ManyToOne(() => User, (user) => user.roles)
    user!: User; // User to whom the role is assigned
  
    @ManyToOne(() => Role, { eager: true })
    role!: Role; // Role assigned to the user
  
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at!: Date;
  }