import { HttpStatusCodes } from '../constants/HttpStatusCodes';
import { BaseException } from './BaseException';

/**
 * @class ExpiredTokenException
 * @description Custom exception for expired or invalid JWT tokens.
 */
export class ExpiredTokenException extends BaseException {
  constructor(message: string = 'The token has expired or is invalid') {
    super(message, HttpStatusCodes.UNAUTHORIZED);
  }
}