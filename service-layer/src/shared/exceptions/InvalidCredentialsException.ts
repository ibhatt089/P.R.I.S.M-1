import { HttpStatusCodes } from '../constants/HttpStatusCodes';
import { BaseException } from './BaseException';
import { ErrorMessages } from '../constants/ErrorMessages';

/**
 * @class InvalidCredentialsException
 * @description Custom exception for invalid login credentials.
 */
export class InvalidCredentialsException extends BaseException {
  /**
   * @constructor
   */
  constructor() {
    super(ErrorMessages.INVALID_CREDENTIALS_ERROR_MSG, HttpStatusCodes.UNAUTHORIZED);
    Object.setPrototypeOf(this, InvalidCredentialsException.prototype);
  }
}