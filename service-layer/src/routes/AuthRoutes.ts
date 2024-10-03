import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';

const router = Router();
const authController = new AuthController();

// Register
router.post('/register', (req, res, next) => authController.register(req, res, next));

// Login
router.post('/login', (req, res, next) => authController.login(req, res, next));

// Logout
router.post('/logout', AuthMiddleware.verifyToken, (req, res, next) => authController.logout(req, res, next));

// Reset Password
router.post('/reset-password', (req, res, next) => authController.resetPassword(req, res, next));

export default router;