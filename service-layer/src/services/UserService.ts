import { getRepository, Repository } from 'typeorm';
import { User } from '../entities/User';
import { SecurityAnswer } from '../entities/SecurityAnswer';
import { HashUtil } from '../utils/HashUtil';

export class UserService {
  private repository: Repository<User> = getRepository(User);
  private securityAnswerRepository: Repository<SecurityAnswer> = getRepository(SecurityAnswer);

  public async getUserById(id: string): Promise<User> {
    const user = await this.repository.findOne({ where: { id }, relations: ['roles', 'security_answers'] });
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    return user;
  }
  

  public async createUser(data: Partial<User>): Promise<User> {
    const user = this.repository.create(data);
    return this.repository.save(user);
  }

  public async updateUser(id: string, data: Partial<User>): Promise<User> {
    await this.repository.update(id, data);
    return this.getUserById(id);
  }

  public async deleteUser(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  public async listUsers(): Promise<User[]> {
    return this.repository.find({ relations: ['roles'] });
  }

  public async addSecurityAnswers(userId: string, answers: Partial<SecurityAnswer>[]): Promise<SecurityAnswer[]> {
    const securityAnswers = answers.map(answer =>
      this.securityAnswerRepository.create({ ...answer, user: { id: userId } })
    );
    return this.securityAnswerRepository.save(securityAnswers);
  }

  public async updatePassword(userId: string, newPassword: string): Promise<void> {
    const hashedPassword = await HashUtil.hashPassword(newPassword);
    await this.repository.update(userId, { password: hashedPassword });
  }

  public async resetPassword(userId: string, securityAnswers: { questionId: string; answer: string }[], newPassword: string): Promise<void> {
    const storedAnswers = await this.securityAnswerRepository.find({ where: { user: { id: userId } } });

    for (const sa of securityAnswers) {
      const match = storedAnswers.some(async stored => 
        stored.question.id === sa.questionId && await HashUtil.comparePasswords(sa.answer, stored.answer)
      );

      if (!await match) {
        throw new Error('Security answers do not match');
      }
    }

    await this.updatePassword(userId, newPassword);
  }

  public async unlockUser(userId: string): Promise<void> {
    await this.repository.update(userId, { isLocked: false, failedLoginAttempts: 0 });
  }

  public async activateUser(userId: string): Promise<void> {
    await this.repository.update(userId, { isActive: true });
  }
}
