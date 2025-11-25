// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
// import { User, IUser } from '../models/userModel'; // Assuming path to User model
import dotenv from 'dotenv';

dotenv.config();

// Extend the Request object to include the user property
export interface AuthRequest extends Request {
    user?: {
        _id: string; // The user ID attached by the middleware
    };
}

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

/**
 * Middleware to check for user authentication using a JWT cookie.
 */
export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.cookies.token;

        if (!token) {
            // 401 Unauthorized: No token found
            res.status(401).json({
                success: false,
                message: 'No token, authorization denied. Please log in.'
            });
            return;
        }

        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

        // Attach user ID to the request object
        req.user = {
            _id: decoded.id
        };

        next();
    } catch (error: any) {
        console.error('Authentication Error:', error.message);

        // Check for specific JWT errors
        if (error.name === 'TokenExpiredError') {
            res.status(401).json({
                success: false,
                message: 'Token expired. Please log in again.'
            });
            return;
        }
         if (error.name === 'JsonWebTokenError') {
            res.status(401).json({
                success: false,
                message: 'Invalid token. Please log in again.'
            });
            return;
        }
    }

    // 500 Internal Server Error for other issues
    res.status(500).json({
        success: false,
        message: 'Authentication failed: Internal error.'
    });
}

