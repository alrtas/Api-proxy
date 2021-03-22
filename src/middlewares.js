function notFound(req, res, next) {
    res.status(404);
    const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
    next(error);
  }
  
  /* eslint-disable no-unused-vars */
  function errorHandler(err, req, res, next) {
    /* eslint-enable no-unused-vars */
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
    });
  }
  
  function log(req, res, next)
  {
    const monk  = require('monk');
    const logs  = monk(process.env.MOGO_LOG_URI).get('api-proxy-logs');
    const logSchema = {
      baseUrl     : req.baseUrl,
      originalUrl : req.originalUrl,
      path        : req.path,
      method      : req.method,
      protocol    : req.protocol,
      hostName    : req.hostname,  
      ip          : req.ip
    }
    logs.insert(logSchema);
    next();
  }
  
  function limiter(req, windowMs, max, next)
  {
    const rateLimit = require("express-rate-limit");
    const rateLimiter = rateLimit({
        windowMs: 30*1000,
        max: 100,
        headers: true
      })
    return rateLimiter;
  }
  
  function speedLimiter(req, windowMs, delayAfter, delayMs)
  {
    const slowDown  = require('express-slow-down');
    const speedLimiter = slowDown({
      windowMs: 30*1000,
      delayAfter: 10,
      delayMs: 500
    })
    return speedLimiter;
  }
  
  module.exports = {
    notFound,
    errorHandler,
    log,
    limiter,
    speedLimiter
  };
  