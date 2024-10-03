import { HttpStatusCodes } from '../constants/HttpStatusCodes';
import { BaseException } from './BaseException';

/**
 * @class InvalidRefreshTokenException
 * @description Custom exception for invalid refresh tokens.
 */
export class InvalidRefreshTokenException extends BaseException {
  constructor(message: string = 'The refresh token is invalid or has expired') {
    super(message, HttpStatusCodes.UNAUTHORIZED);
  }
}