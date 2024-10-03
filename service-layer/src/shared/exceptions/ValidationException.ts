import { HttpStatusCodes } from '../constants/HttpStatusCodes';
import { BaseException } from './BaseException';

/**
 * @class ValidationException
 * @description Custom exception for handling validation errors in request data.
 */
export class ValidationException extends BaseException {
  /**
   * @constructor
   * @param {string} message - The validation error message.
   */
  constructor(message: string) {
    super(message, HttpStatusCodes.BAD_REQUEST);
    Object.setPrototypeOf(this, ValidationException.prototype);
  }
}