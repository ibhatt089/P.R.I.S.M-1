import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'secret';

/**
 * @class TokenUtil
 * @description Utility class for managing JWT tokens.
 */
export class TokenUtil {
  /**
   * @method generateToken
   * @description Generates a JWT token with the given payload.
   * @param {object} payload - The payload to include in the token.
   * @param {string} expiresIn - The duration for which the token is valid.
   * @returns {string} The generated JWT token.
   */
  public static generateToken(payload: object, expiresIn: string = '1h'): string {
    return jwt.sign(payload, secretKey, { expiresIn });
  }

  /**
   * @method verifyToken
   * @description Verifies the authenticity of a given token.
   * @param {string} token - The token to verify.
   * @returns {object | string} The decoded payload if verification is successful.
   * @throws {Error} If verification fails.
   */
  public static verifyToken(token: string): object | string {
    try {
      return jwt.verify(token, secretKey);
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }
}