import { Request, Response, NextFunction } from 'express';
import { Logger } from './Logger';
import { BaseException } from './exceptions/BaseException';
import { HttpStatusCodes } from './constants/HttpStatusCodes';

/**
 * @function ErrorHandler
 * @description Global error handling middleware for Express.
 * Logs errors and returns appropriate HTTP responses.
 * @param {Error} err - The error thrown by the application.
 * @param {Request} req - The Express Request object.
 * @param {Response} res - The Express Response object.
 * @param {NextFunction} next - The next middleware function.
 */
export function ErrorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
  const logger = new Logger();
  const statusCode = err instanceof BaseException ? err.statusCode : HttpStatusCodes.INTERNAL_SERVER_ERROR;

  logger.logError(err.message);
  
  res.status(statusCode).json({
    success: false,
    message: err.message,
  });
}