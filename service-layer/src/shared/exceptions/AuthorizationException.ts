import { HttpStatusCodes } from '../constants/HttpStatusCodes';
import { BaseException } from './BaseException';

/**
 * @class AuthorizationException
 * @description Custom exception to handle authorization errors. 
 * This exception is thrown when a user does not have the necessary permissions to access a resource.
 */
export class AuthorizationException extends BaseException {

  /**
   * @constructor
   * @description Initializes the AuthorizationException with a default message and a 403 status code.
   * 
   * @param {string} [message='Access denied. Unauthorized.'] - The error message.
   */
  constructor(message: string = 'Access denied. Unauthorized.') {
    super(message, HttpStatusCodes.FORBIDDEN);
  }
}