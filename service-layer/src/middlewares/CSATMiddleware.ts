import { Request, Response, NextFunction } from 'express';

export const validateCSATData = (req: Request, res: Response, next: NextFunction) => {
  const { score, feedback } = req.body;
  
  if (typeof score !== 'number' || score < 1 || score > 5) {
    return res.status(400).json({ message: 'Invalid CSAT score. Must be between 1 and 5.' });
  }

  if (!feedback || typeof feedback !== 'string') {
    return res.status(400).json({ message: 'Feedback is required.' });
  }

  next();
};