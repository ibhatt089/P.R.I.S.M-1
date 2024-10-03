import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
  OneToMany,
} from "typeorm";

import { User } from "./User";
import { Permission } from "./Permission";
import { UserRole } from "./UserRole";

/**
 * @class Role
 * @description Represents a role that can be assigned to users.
 */
@Entity("roles")
export class Role {
  @PrimaryGeneratedColumn("uuid")
  id!: string; // Unique identifier for each role

  @Column({ type: "varchar", length: 50, unique: true })
  name!: string; // Role name (e.g., Admin, Developer, Manager)

  @Column({ type: "varchar", length: 255, nullable: true })
  description?: string; // Optional description of the role

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date; // Timestamp when the role was created

  // Relationships
  @ManyToMany(() => User, (user) => user.roles)
  users!: User[]; // Users that have this role

  @OneToMany(() => UserRole, (userRole) => userRole.role)
  userRoles!: UserRole[]; // Users with this role

  @OneToMany(() => Permission, (permission) => permission.role)
  permissions!: Permission[]; // Permissions assigned to the role
}
