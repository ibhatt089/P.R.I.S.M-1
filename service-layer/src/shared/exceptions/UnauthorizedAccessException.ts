import { HttpStatusCodes } from '../constants/HttpStatusCodes';
import { BaseException } from './BaseException';
import { ErrorMessages } from '../constants/ErrorMessages';

/**
 * @class UnauthorizedAccessException
 * @description Custom exception for unauthorized access attempts.
 */
export class UnauthorizedAccessException extends BaseException {
  /**
   * @constructor
   */
  constructor() {
    super(ErrorMessages.UNAUTHORIZED_ACCESS_ERROR_MSG, HttpStatusCodes.FORBIDDEN);
    Object.setPrototypeOf(this, UnauthorizedAccessException.prototype);
  }
}