import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './User';
import { SecurityQuestion } from './SecurityQuestion';

/**
 * @class SecurityAnswer
 * @description Represents an answer to a security question provided by a user.
 */
@Entity('security_answers')
export class SecurityAnswer {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, (user) => user.securityAnswers)
  user!: User; // User to whom the answer belongs

  @ManyToOne(() => SecurityQuestion, { eager: true })
  question!: SecurityQuestion; // Security question being answered

  @Column({ type: 'varchar' })
  answer!: string; // Hashed answer to the security question

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;
}
