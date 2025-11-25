// src/routes/authRoutes.ts
import { Router } from 'express';
import { register, login, getMe, logout } from '../controllers/authController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

// Public Routes
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout); // Logout can be public as it just clears the cookie

// Private Routes
router.get('/me', authenticate, getMe);

export default router;
