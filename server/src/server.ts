import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import subredditRoutes from './routes/subreddit.routes';
import userRoutes from './routes/user.routes';
import { errorHandler } from './middleware/error.middleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Core Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// API Routes
app.use('/api/subreddit', subredditRoutes);
app.use('/api/user', userRoutes);

// Health Check Endpoint
app.get('/api/health', (_req, res) => {
  res.status(200).json({
    status: 'OK',
    service: 'Subreddit Vibe Check API',
    timestamp: new Date().toISOString()
  });
});

// Centralized Error Middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Subreddit Vibe Check API Server running on http://localhost:${PORT}`);
});
