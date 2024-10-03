import { HttpStatusCodes } from '../constants/HttpStatusCodes';
import { BaseException } from './BaseException';

/**
 * @class ResourceNotFoundException
 * @description Custom exception for handling "Resource Not Found" scenarios.
 * Extends the BaseException to standardize error handling.
 */
export class ResourceNotFoundException extends BaseException {
  /**
   * @constructor
   * @param {string} resourceName - The name of the resource that could not be found.
   */
  constructor(resourceName: string) {
    super(`${resourceName} not found.`, HttpStatusCodes.NOT_FOUND);
    Object.setPrototypeOf(this, ResourceNotFoundException.prototype);
  }
}