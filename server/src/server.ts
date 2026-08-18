import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import subredditRoutes from './routes/subreddit.routes';
import userRoutes from './routes/user.routes';
import { errorHandler } from './middleware/error.middleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Explicit CORS Headers Middleware for robust cross-origin access
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
    return;
  }
  next();
});

app.use(cors());
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
  console.log(`🚀 Subreddit Vibe Check API Server running on port ${PORT}`);
});
