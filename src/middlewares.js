function notFound(req, res, next) {
    res.status(404);
    const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
    next(error);
}

function errorHandler(err, req, res, next) {
    /* eslint-enable no-unused-vars */
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
      message: 'error',
      reason: err.message,
      stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
    });
}
  
async function log(req, res, next)
{
    try
    {
        const db        = require('./db');
        const Log       = require('./models/log');
        const mongoose  = await db.connect();

        const log  = new Log({
            _id         : new mongoose.Types.ObjectId(),
            time        : Date.now(),
            baseUrl     : req.baseUrl,
            originalUrl : req.originalUrl,
            path        : req.path,
            method      : req.method,
            protocol    : req.protocol,
            hostName    : req.hostname,  
            ip          : req.ip,
        })
        await log.save();
        console.dir('[Log Middleware] ----> SUCCESS'); next();
    }
    catch(err)
    {
        next(err);
    }
}

async function cache(req, res, next){
    try 
    {
        const db    = require('./db');
            db.connect()
        const Cache = require('./models/cache');
        const lastMinute =  new Date() - process.env.CACHE_TIME*1000;
        
        
        const item = await Cache.findOne({
            originalUrl: req.originalUrl,
            time: { $gt: lastMinute}
        });

        if(item == null){
            console.dir('[Cache Middleware] --> SUCCESS --> Getting new http request')
            next();
        }else{
            console.dir('[Cache Middleware] --> SUCCESS --> Showing cached data')
            res.json(item.response)
        }
    } 
    catch (err) 
    {   
        next(err);  
    }
}

function limiter(err, req, res, next)
{
    const rateLimit = require("express-rate-limit");
    const rateLimiter = rateLimit({
        windowMs: 30*1000,
        max: 10,
        headers: true
    })
    return rateLimiter;
}
  
function speedLimiter(err, req, res, next)
{
    const slowDown  = require('express-slow-down');
    const speedLimiter = slowDown({
            windowMs: 30*1000,
            delayAfter: 1,
            delayMs: 500
    })
    return speedLimiter;
}
  
  module.exports = {
    notFound,
    errorHandler,
    log,
    cache
  };
  