import { Request, Response, NextFunction } from "express";
import { BaseController } from "../shared/BaseController";
import { AuthService } from "../services/AuthService";
import { HttpStatusCodes } from "../shared/constants/HttpStatusCodes";
import { ErrorMessages } from "../shared/constants/ErrorMessages";

/**
 * @class AuthController
 * @description Controller to handle user authentication-related requests.
 */
export class AuthController extends BaseController {
  private authService: AuthService;

  constructor() {
    super();
    this.authService = new AuthService();
  }

  /**
   * @method register
   * @description Handles user registration.
   */
  public async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    await this.handleRequest(req, res, next, async () => {
      const user = await this.authService.register(req.body);
      this.sendResponse(res, user, HttpStatusCodes.CREATED);
    });
  }

  /**
   * @method login
   * @description Handles user login.
   */
  public async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    await this.handleRequest(req, res, next, async () => {
      const { email, password } = req.body;
      const user = await this.authService.login(email, password);

      if (!user) {
        this.sendError(
          res,
          new Error(ErrorMessages.INVALID_CREDENTIALS_ERROR_MSG),
          HttpStatusCodes.UNAUTHORIZED
        );
      }
      this.sendResponse(res, user);
    });
  }

  /**
   * @method logout
   * @description Handles user logout.
   */
  public async logout(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    await this.handleRequest(req, res, next, async () => {
        await this.authService.logout();
        this.sendResponse(
          res,
          { message: "Successfully logged out" },
          HttpStatusCodes.NO_CONTENT
        );
      });
  }

  /**
   * @method resetPassword
   * @description Handles password reset.
   */
  public async resetPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    await this.handleRequest(req, res, next, async () => {
      const { email, newPassword, securityAnswers } = req.body;
      await this.authService.resetPassword(email, newPassword, securityAnswers);
      this.sendResponse(res, { message: "Password reset successful" });
    });
  }
}
