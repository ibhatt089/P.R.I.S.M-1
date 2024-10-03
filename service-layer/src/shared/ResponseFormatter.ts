import { Response } from 'express';

/**
 * @class ResponseFormatter
 * @description Utility class for formatting HTTP responses.
 */
export class ResponseFormatter {
  /**
   * @method success
   * @description Formats a successful HTTP response.
   * @param {Response} res - The Express Response object.
   * @param {any} data - The data to send in the response.
   * @param {number} statusCode - The HTTP status code (default: 200).
   * @returns {Response} The formatted response.
   */
  public static success(res: Response, data: any, statusCode: number = 200): Response {
    return res.status(statusCode).json({
      success: true,
      data,
    });
  }

  /**
   * @method error
   * @description Formats an error HTTP response.
   * @param {Response} res - The Express Response object.
   * @param {string} message - The error message to send.
   * @param {number} statusCode - The HTTP status code (default: 500).
   * @returns {Response} The formatted response.
   */
  public static error(res: Response, message: string, statusCode: number = 500): Response {
    return res.status(statusCode).json({
      success: false,
      message,
    });
  }
}