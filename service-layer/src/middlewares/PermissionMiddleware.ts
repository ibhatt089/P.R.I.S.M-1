import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { HttpStatusCodes } from '../shared/constants/HttpStatusCodes';
import { ErrorMessages } from '../shared/constants/ErrorMessages';
import { UserRole } from '../entities/UserRole';
import { RoleConstants } from '../shared/constants/RoleConstants';

/**
 * @class PermissionMiddleware
 * @description Middleware to verify user permissions based on roles.
 */
export class PermissionMiddleware {
  public static async verifyAdminOrProjectManager(req: Request, res: Response, next: NextFunction): Promise<void> {
    const user = req.user;
    if (!user) {
     res.status(HttpStatusCodes.UNAUTHORIZED).json({ error: ErrorMessages.UNAUTHORIZED_ACCESS_ERROR_MSG });
    }
    else {
    try {
      const userRoleRepository = getRepository(UserRole);
      const userRoles = await userRoleRepository.find({
        where: { user: { id: user.id } }
      });

      const hasAdminOrManagerRole = userRoles.some(
        (userRole: { role: { name: string; }; }) => userRole.role.name === RoleConstants.ADMIN || userRole.role.name === RoleConstants.PROJECT_MANAGER
      );

      if (!hasAdminOrManagerRole) {
         res.status(HttpStatusCodes.FORBIDDEN).json({ error: ErrorMessages.FORBIDDEN_ACCESS_ERROR_MSG });
      }

      next();
    } catch (error) {
       res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: ErrorMessages.INTERNAL_SERVER_ERROR_MSG });
    }
}
  }

  public static async verifyProjectAccess(req: Request, res: Response, next: NextFunction): Promise<void> {
    const user = req.user;
    if (!user) {
       res.status(HttpStatusCodes.UNAUTHORIZED).json({ error: ErrorMessages.UNAUTHORIZED_ACCESS_ERROR_MSG });
    }

    try {
      // Here, add logic to verify that the user is assigned to this project.
      // Example:
      // const hasAccess = await someService.checkProjectAccess(user.id, req.params.id);
      // if (!hasAccess) {
      //   return res.status(HttpStatusCodes.FORBIDDEN).json({ error: ErrorMessages.FORBIDDEN_ACCESS_ERROR_MSG });
      // }

      next();
    } catch (error) {
       res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: ErrorMessages.INTERNAL_SERVER_ERROR_MSG });
    }
  }
}