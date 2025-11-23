const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    
    res.status(statusCode).json({
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
  };
  
  const notFound = (req, res, next) => {
    console.log(`❌ 404 - Route not found: ${req.method} ${req.originalUrl}`);
    console.log(`   Available routes: POST /api/auth/register, POST /api/auth/login`);
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
  };
  
  module.exports = { errorHandler, notFound };