// src/controllers/authController.ts
import { Request, Response } from 'express';
import { User, IUser } from '../models/userModel';
import { AuthRequest } from '../middleware/authMiddleware';
import bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';
const JWT_EXPIRE = process.env.JWT_EXPIRE || '30d';
interface TokenPayload {
  userId: string;
  email: string;
}
/**
 * Helper to generate JWT and set as HTTP-only cookie
 */
const sendTokenResponse = (user: IUser, statusCode: number, res: Response) => {
  const payload: TokenPayload = {
    userId: user._id.toString(),
    email: user.email
  };

  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }

  const token =jwt.sign(payload, JWT_SECRET as jwt.Secret, {
    expiresIn: JWT_EXPIRE as jwt.SignOptions['expiresIn'],
  });

  const cookieOptions = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const
  };

  res.status(statusCode).cookie('token', token, cookieOptions).json({
    success: true,
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email
    }
  });
};

/**
 * @desc Register a new user
 * @route POST /api/auth/register
 * @access Public
 */
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ success: false, message: 'Please provide name, email, and password' });
      return;
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ success: false, message: 'User with that email already exists' });
      return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    sendTokenResponse(user, 201, res);
  } catch (error: any) {
    console.error('Register Error:', error);
    res.status(500).json({ success: false, message: 'Failed to register user' });
  }
};

/**
 * @desc Login user
 * @route POST /api/auth/login
 * @access Public
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ success: false, message: 'Please provide email and password' });
      return;
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
      return;
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
      return;
    }

    sendTokenResponse(user, 200, res);
  } catch (error: any) {
    console.error('Login Error:', error);
    res.status(500).json({ success: false, message: 'Failed to log in' });
  }
};

/**
 * @desc Get current logged in user
 * @route GET /api/auth/me
 * @access Private
 */
export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user || !req.user._id) {
      // Should be caught by middleware, but check as a fallback
      res.status(401).json({ success: false, message: 'User not authenticated' });
      return;
    }

    // Find user by ID, exclude password
    const user = await User.findById(req.user._id).select('-password');

    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    res.status(200).json({
      success: true,
      user
    });
  } catch (error: any) {
    console.error('Get Me Error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch user data' });
  }
};

/**
 * @desc Log user out / clear cookie
 * @route POST /api/auth/logout
 * @access Private
 */
export const logout = async (_req: Request, res: Response): Promise<void> => {
  try {
    res.cookie('token', 'none', {
      expires: new Date(Date.now() + 10 * 1000), // expire in 10 seconds
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const,
    });

    res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error: any) {
    console.error('Logout Error:', error);
    res.status(500).json({ success: false, message: 'Failed to log out' });
  }
};
