import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { HttpStatusCodes } from '../shared/constants/HttpStatusCodes';
import { ErrorMessages } from '../shared/constants/ErrorMessages';

export class AuthMiddleware {
    
    public static verifyToken(req: Request, res: Response, next: NextFunction): void {
  try {
    // Extract token from Authorization header
    const token = req.headers.authorization?.split(' ')[1];
    
    // If there's no token, respond with Unauthorized status
    if (!token) {
      res.status(HttpStatusCodes.UNAUTHORIZED).json({ 
        error: ErrorMessages.UNAUTHORIZED_ACCESS_ERROR_MSG 
      });
      return;  // Ensure the function terminates after sending the response
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = decoded;

    // Proceed to the next middleware if verification is successful
    next();
  } catch (error) {
    // Handle invalid or expired token
    res.status(HttpStatusCodes.UNAUTHORIZED).json({ 
      error: ErrorMessages.EXPIRED_SESSION_TOKEN_ERROR_MSG 
    });
    return;  // Ensure the function terminates after sending the response
  }
};
}


