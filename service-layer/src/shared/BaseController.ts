import { Request, Response, NextFunction } from 'express';
import { Logger } from './Logger';
import { HttpStatusCodes } from './constants/HttpStatusCodes';
import { BaseException } from './exceptions/BaseException';
import { ResponseFormatter } from './ResponseFormatter';

/**
 * @class BaseController
 * @description Abstract base class providing a foundation for all controllers.
 * Implements the Template Method pattern to handle request validation, processing, 
 * and error handling, enforcing the SOLID principles and supporting modularity and reusability.
 * 
 * This class can be extended by any controller that needs to handle HTTP requests and responses
 * in a structured manner.
 */
export abstract class BaseController {

  protected logger: Logger;

  /**
   * @constructor
   * @description Initializes the BaseController with a Logger instance.
   * Logger can be injected to enable better testability and separation of concerns.
   * 
   * @param {Logger} logger - Logger instance (default: new Logger).
   */
  constructor(logger: Logger = new Logger()) {
    this.logger = logger;
  }

  /**
   * @method handleRequest
   * @description Template method for handling HTTP requests. 
   * This method:
   *  1. Validates the incoming request using the `validateRequest` hook (can be overridden).
   *  2. Calls the abstract `processRequest` method, which must be implemented by the derived class.
   *  3. Handles errors using the `sendError` method.
   * 
   * This method ensures that request handling follows a standardized structure across all controllers,
   * while allowing flexibility through inheritance.
   * 
   * @param {Request} req - The Express Request object representing the HTTP request.
   * @param {Response} res - The Express Response object used to send the HTTP response.
   * @param {NextFunction} next - The NextFunction callback to pass control to the next middleware.
   * 
   * @throws {BaseException} Throws a `BaseException` if validation fails or an internal error occurs.
   */
  public async handleRequest(req: Request, res: Response, next: NextFunction, action: () => Promise<void>): Promise<void> {
    try {
      // Hook for validation (overridable by derived controllers)
      if (!this.validateRequest(req)) {
        this.sendError(res, new BaseException('Invalid request data', HttpStatusCodes.BAD_REQUEST));
        return;
      }

      await action();
    } catch (error) {
      const err = error as Error;
      this.logger.logError(`Error in handleRequest: ${err.message}`);
      this.sendError(res, err);
    }
  }

  /**
   * @method validateRequest
   * @description Prototype method for validating requests. 
   * Derived classes can override this method to implement custom validation logic.
   * 
   * @param {Request} req - The Express Request object.
   * @returns {boolean} - Returns true if the request is valid, otherwise false.
   */
  protected validateRequest(req: Request): boolean {
    // Default implementation assumes the request is valid
    return true;
  }

  /**
   * @method sendResponse
   * @description Sends a successful HTTP response with the provided data.
   * 
   * @param {Response} res - The Express Response object.
   * @param {any} data - The data to include in the response.
   * @param {number} [statusCode=200] - The HTTP status code (default: 200).
   * @returns {Response} - The Express Response object.
   */
  protected sendResponse(res: Response, data: any, statusCode: number = HttpStatusCodes.OK): Response {
    this.logger.logInfo(`Response sent with status code: ${statusCode}`);
    return ResponseFormatter.success(res, data, statusCode);
  }

  /**
   * @method sendError
   * @description Sends an error response with the appropriate error message and status code.
   * 
   * @param {Response} res - The Express Response object.
   * @param {BaseException | Error} error - The error object to send.
   * @param {number} [statusCode=500] - The HTTP status code (default: 500).
   * @returns {Response} - The Express Response object.
   */
  protected sendError(res: Response, error: BaseException | Error, statusCode: number = HttpStatusCodes.INTERNAL_SERVER_ERROR): Response {
    const errorMessage = error instanceof BaseException ? error.message : 'An unknown error occurred';
    const finalStatusCode = error instanceof BaseException ? error.statusCode : statusCode;
    this.logger.logError(`Error: ${errorMessage} with status code: ${finalStatusCode}`);
    return ResponseFormatter.error(res, errorMessage, finalStatusCode);
  }
}