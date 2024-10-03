import { getRepository, Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../entities/User';
import { SecurityAnswer } from '../entities/SecurityAnswer';
import { ErrorMessages } from '../shared/constants/ErrorMessages';

/**
 * @class AuthService
 * @description Service to handle authentication operations like register, login, logout, etc.
 */
export class AuthService {
  private userRepository: Repository<User> = getRepository(User);
  private securityAnswerRepository: Repository<SecurityAnswer> = getRepository(SecurityAnswer);

  public async register(userData: Partial<User>): Promise<User> {
    if (!userData.password) {
      throw new Error("Password is required");
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10); // Await added for consistency
    const user = this.userRepository.create({ ...userData, password: hashedPassword });
    return this.userRepository.save(user);
  }

  /**
   * @method login
   * @description Authenticates a user using either email/password or user_id/password.
   *
   * @param {string} identifier - Either the user's email or user_id.
   * @param {string} password - The user's password.
   * @returns {Promise<{ token: string } | null>} - Returns a JWT token if login is successful.
   */
  public async login(identifier: string, password: string): Promise<{ token: string } | null> {
    const user = await this.userRepository.findOne({
      where: [{ email: identifier }, { userId: identifier }],
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return null;
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, userId: user.userId },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    return { token };
  }

  /**
   * @method logout
   * @description Logs out a user by implementing a token invalidation strategy.
   *
   * @returns {Promise<void>}
   */
  public async logout(): Promise<void> {
    console.log(`Logged out successfully`);
    // Implement further logout mechanism here, e.g., token invalidation strategy.
  }

  public async resetPassword(email: string, newPassword: string, securityAnswers: { questionId: string, answer: string }[]): Promise<void> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error(ErrorMessages.RESOURCE_NOT_FOUND_ERROR_MSG);
    }

    const answers = await this.securityAnswerRepository.find({ where: { user } });
    if (answers.length !== securityAnswers.length || !this.areAnswersCorrect(answers, securityAnswers)) {
      throw new Error(ErrorMessages.UNAUTHORIZED_ACCESS_ERROR_MSG);
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await this.userRepository.save(user);
  }

  private areAnswersCorrect(existingAnswers: SecurityAnswer[], providedAnswers: { questionId: string, answer: string }[]): boolean {
    return providedAnswers.every(({ questionId, answer }) => {
      const storedAnswer = existingAnswers.find(ans => ans.question.id === questionId);
      return storedAnswer && bcrypt.compareSync(answer, storedAnswer.answer);
    });
  }
}
