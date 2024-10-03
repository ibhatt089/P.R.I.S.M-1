/**
 * @class BaseException
 * @description The base class for all custom exceptions in the system.
 * It extends the built-in Error class and provides additional properties for status codes.
 *
 * Inheritance:
 * - Custom exceptions can extend BaseException to handle different error scenarios.
 */
export class BaseException extends Error {
  public statusCode: number;
  public stackTrace?: string;

  /**
   * @constructor
   * @description Initializes the BaseException with a message and an optional status code.
   *
   * @param {string} message - The error message.
   * @param {number} [statusCode=500] - The HTTP status code (default: 500).
   */
  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;

    // Automatically capture the stack trace
    this.stackTrace = this.stack;
  }
}