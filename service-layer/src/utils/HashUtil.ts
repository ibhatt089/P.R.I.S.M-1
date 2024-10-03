import bcrypt from 'bcrypt';

/**
 * @class HashUtil
 * @description Utility class for hashing and comparing passwords.
 */
export class HashUtil {
  private static saltRounds = 10;

  /**
   * @method hashPassword
   * @description Hashes a plain-text password.
   * @param {string} password - The password to hash.
   * @returns {Promise<string>} The hashed password.
   */
  public static async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }

  /**
   * @method comparePasswords
   * @description Compares a plain-text password with a hashed password.
   * @param {string} password - The plain-text password.
   * @param {string} hash - The hashed password.
   * @returns {Promise<boolean>} True if passwords match, false otherwise.
   */
  public static async comparePasswords(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}