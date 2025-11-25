import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Load environment variables BEFORE everything
dotenv.config();

// Import Routes
import authRoutes from './routes/authRoutes';
import dreamRoutes from './routes/dreamRoutes'; // <-- UPDATED to use your actual model (Dreams)

// Create Express app
const app: Express = express();
const MONGODB = process.env.MONGODBURL;
const PORT = process.env.PORT || 5010;

// Connect to MongoDB

const connectDB = async () => {
  try {
    if (!MONGODB) {
      throw new Error("❌ MONGODBURL is missing in .env");
    }

    await mongoose.connect(MONGODB);
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err);
    process.exit(1); // stop server on DB fail
  }
};

connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS configuration
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
    optionsSuccessStatus: 200
  })
);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/dreams', dreamRoutes); // <-- UPDATED HERE

// Health Check
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Main API Root
app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Dream Management API Server',
    version: '1.0.0',
    endpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        logout: 'POST /api/auth/logout',
        me: 'GET /api/auth/me'
      },
      dreams: {
   getAll: 'GET /api/dreams',
        getOne: 'GET /api/dreams/:id',
        create: 'POST /api/dreams',
        update: 'PUT /api/dreams/:id',
        delete: 'DELETE /api/dreams/:id',
        toggleFavorite: 'PATCH /api/dreams/:id/favorite',
        getFavorites: 'GET /api/dreams/favorites',
        getTags: 'GET /api/dreams/tags',
        getStats: 'GET /api/dreams/stats',
        search: 'GET /api/dreams/search'
      }
    }
  });
});

// 404 Handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Global Error Handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Error:', err);

  const status = err.status || 500;
  const message = err.message || 'Internal server error';

  res.status(status).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
