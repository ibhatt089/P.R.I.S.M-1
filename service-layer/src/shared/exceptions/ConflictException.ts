import { HttpStatusCodes } from '../constants/HttpStatusCodes';
import { BaseException } from './BaseException';

/**
 * @class ConflictException
 * @description Custom exception for handling conflicts, such as duplicate records.
 */
export class ConflictException extends BaseException {
  /**
   * @constructor
   * @param {string} message - The conflict message.
   */
  constructor(message: string) {
    super(message, HttpStatusCodes.CONFLICT);
    Object.setPrototypeOf(this, ConflictException.prototype);
  }
}