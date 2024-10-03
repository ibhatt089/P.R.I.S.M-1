import winston from 'winston';

/**
 * @class Logger
 * @description A simple logging class that provides various logging levels (info, error, warn, debug).
 * It uses winston for structured logging and supports console and file transports.
 */
export class Logger {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: 'debug', // Default log level
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
          return `[${timestamp}] [${level.toUpperCase()}]: ${message}`;
        })
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/app.log' })
      ],
    });
  }

  /**
   * @method logInfo
   * @description Logs an info-level message.
   * @param {string} message - The message to log.
   */
  logInfo(message: string): void {
    this.logger.info(message);
  }

  /**
   * @method logError
   * @description Logs an error-level message.
   * @param {string} message - The error message to log.
   */
  logError(message: string): void {
    this.logger.error(message);
  }

  /**
   * @method logWarn
   * @description Logs a warning-level message.
   * @param {string} message - The warning message to log.
   */
  logWarn(message: string): void {
    this.logger.warn(message);
  }

  /**
   * @method logDebug
   * @description Logs a debug-level message, but only if the environment is not production.
   * @param {string} message - The debug message to log.
   */
  logDebug(message: string): void {
    if (process.env.NODE_ENV !== 'production') {
      this.logger.debug(message);
    }
  }

  /**
   * @method logWithTimestamp
   * @description Logs a message with a timestamp. This method demonstrates the Decorator Pattern by
   * adding extra functionality (a timestamp) to the basic logging behavior.
   * 
   * @param {string} level - The log level (info, error, warn, debug).
   * @param {string} message - The message to log.
   */
  logWithTimestamp(level: string, message: string): void {
    const timestamp = new Date().toISOString();
    switch (level.toLowerCase()) {
      case 'info':
        this.logger.info(`[${timestamp}] ${message}`);
        break;
      case 'error':
        this.logger.error(`[${timestamp}] ${message}`);
        break;
      case 'warn':
        this.logger.warn(`[${timestamp}] ${message}`);
        break;
      case 'debug':
        if (process.env.NODE_ENV !== 'production') {
          this.logger.debug(`[${timestamp}] ${message}`);
        }
        break;
      default:
        this.logger.info(`[${timestamp}] ${message}`);
        break;
    }
  }
}