const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

// Load env vars
dotenv.config();

// Validate required environment variables
const requiredEnvVars = ['MONGO_URI', 'JWT_SECRET'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error(`❌ Missing required environment variables: ${missingEnvVars.join(', ')}`);
  console.error('Please create a .env file in the backend directory with the required variables.');
  console.error('Example .env file:');
  console.error('  MONGO_URI=mongodb+srv://spendwise:spendwise2025@cluster0.wzugxru.mongodb.net/?appName=Cluster0');
  console.error('  JWT_SECRET=d7b460a4a9f54fad663d6b924ee487f507969edc');
  console.error('  JWT_EXPIRE=30d');
  console.error('  PORT=5000');
  process.exit(1);
}

// Connect to database
// Note: connectDB will exit the process if it fails, so we don't need to catch here
connectDB();

const app = express();

// Request logging middleware (for debugging)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS Configuration
const allowedOrigins = process.env.CLIENT_URL 
  ? process.env.CLIENT_URL.split(',').map(url => url.trim())
  : ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'];

// Always add Vercel domain (works in both dev and production)
const vercelDomain = 'https://spendwise-flax.vercel.app';
if (!allowedOrigins.includes(vercelDomain)) {
  allowedOrigins.push(vercelDomain);
}

console.log('🌐 Allowed CORS origins:', allowedOrigins);

// CORS middleware with proper preflight handling
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      // In development, allow any localhost port
      if (process.env.NODE_ENV === 'development' && origin.startsWith('http://localhost:')) {
        return callback(null, true);
      }
      
      // Always allow Vercel domains
      if (origin.includes('vercel.app')) {
        console.log(`✅ CORS: Allowing Vercel origin: ${origin}`);
        return callback(null, true);
      }
      
      // Check against allowed origins
      if (allowedOrigins.indexOf(origin) !== -1) {
        console.log(`✅ CORS: Allowing configured origin: ${origin}`);
        callback(null, true);
      } else {
        console.warn(`⚠️ CORS blocked origin: ${origin}`);
        console.warn(`   Allowed origins: ${allowedOrigins.join(', ')}`);
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Authorization'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

// Handle preflight requests explicitly (Express 5 compatible)
// Note: Express 5 doesn't support '*' wildcard, so we handle OPTIONS in middleware
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    const origin = req.headers.origin;
    console.log(`🔄 OPTIONS preflight request from: ${origin}`);
    
    // Allow Vercel domains
    if (origin && origin.includes('vercel.app')) {
      res.header('Access-Control-Allow-Origin', origin);
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');
      res.header('Access-Control-Allow-Credentials', 'true');
      res.header('Access-Control-Max-Age', '86400'); // 24 hours
      return res.sendStatus(204);
    }
  }
  next();
});

// Routes
let authRoutes, expenseRoutes;
try {
  authRoutes = require('./routes/authRoutes');
  expenseRoutes = require('./routes/expenseRoutes');
  console.log('✅ Route modules loaded successfully');
} catch (error) {
  console.error('❌ Error loading route modules:', error);
  console.error('Stack:', error.stack);
  process.exit(1);
}

try {
  app.use('/api/auth', authRoutes);
  app.use('/api/expenses', expenseRoutes);
  console.log('✅ Routes registered successfully');
  console.log('📋 Available routes:');
  console.log('   POST /api/auth/register');
  console.log('   POST /api/auth/login');
  console.log('   GET/PUT /api/auth/profile');
} catch (error) {
  console.error('❌ Error registering routes:', error);
  console.error('Stack:', error.stack);
  process.exit(1);
}

// Health check route (before other routes)
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Root route
app.get('/', (req, res) => {
  res.json({ message: '🚀 SpendWise API is running...' });
});

// Test route to verify server is working
app.get('/api/test', (req, res) => {
  res.json({ message: 'API routes are working!', timestamp: new Date().toISOString() });
});

// Route info endpoint for debugging
app.get('/api/routes', (req, res) => {
  res.json({
    message: 'Available routes',
    routes: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        profile: 'GET/PUT /api/auth/profile',
      },
      test: 'GET /api/test',
      health: 'GET /health',
    },
  });
});

// Error handlers (must be after routes)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});