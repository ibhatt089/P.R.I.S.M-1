import { Request, Response, NextFunction } from 'express';

/**
 * @function validateTaskData
 * @description Middleware to validate task creation or update data.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 */
export const validateTaskData = (req: Request, res: Response, next: NextFunction) => {
  const { title, description } = req.body;
  
  if (!title || typeof title !== 'string') {
    return res.status(400).json({ error: 'Task title is required and must be a string.' });
  }

  if (description && typeof description !== 'string') {
    return res.status(400).json({ error: 'Task description must be a string.' });
  }

  next();
};