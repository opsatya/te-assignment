import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import projectRoutes from './routes/project.routes';

const app = express();

// CORS configuration - multiple origins allow karne ke liye
const allowedOrigins = [
  'http://localhost:5173', // Local development
  'http://localhost:3000', // Alternative local port
  'https://project-management-tawny-chi.vercel.app', // Production frontend
];

// Environment variable se additional origins add karo (comma-separated)
if (process.env.FRONTEND_URL) {
  const envOrigins = process.env.FRONTEND_URL.split(',').map(url => url.trim());
  allowedOrigins.push(...envOrigins);
}

// CORS middleware with origin validation
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, Postman, etc.)
    if (!origin) {
      return callback(null, true);
    }
    
    // Check if origin is in allowed list
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else if (origin.endsWith('.vercel.app')) {
      // Allow all Vercel deployments (for preview deployments, etc.)
      callback(null, true);
    } else {
      // Log for debugging
      console.log(`CORS blocked origin: ${origin}`);
      // In development, allow all origins for easier testing
      if (process.env.NODE_ENV !== 'production') {
        callback(null, true);
      } else if (process.env.ALLOW_ALL_ORIGINS === 'true') {
        // In production, only allow if explicitly set
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.json({ 
    message: 'Project Management API is running!', 
    status: 'OK' 
  });
});

app.use('/api/projects', projectRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).json({ 
    error: 'Route not found', 
    message: `Yeh route exist nahi karta: ${req.method} ${req.path}` 
  });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error aaya:', err);
  res.status(500).json({ 
    error: 'Internal server error', 
    message: 'Kuch galat ho gaya, baad mein try karo' 
  });
});

export default app;



