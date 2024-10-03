import { HttpStatusCodes } from '../constants/HttpStatusCodes';
import { BaseException } from './BaseException';

/**
 * @class UserNotFoundException
 * @extends {BaseException}
 * @description Exception to be thrown when a user is not found in the system.
 */
export class UserNotFoundException extends BaseException {
  
  /**
   * @constructor
   * @param {string} message - The exception message to provide more context.
   */
  constructor(message: string = 'User not found') {
    super(message, HttpStatusCodes.NOT_FOUND);
  }
}