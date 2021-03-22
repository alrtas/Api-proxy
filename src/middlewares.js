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
    const logs  = monk(process.env.MONGO_LOG_URI).get('api-proxy-logs');
    const logSchema = {
      baseUrl     : req.baseUrl,
      originalUrl : req.originalUrl,
      path        : req.path,
      method      : req.method,
      protocol    : req.protocol,
      hostName    : req.hostname,  
      ip          : req.ip,
      createdAt   : new Date()
    }
    //logs.insert(logSchema);
    next(req.baseUrl);
}
  
function cache(err, req, res, next)
{
    try 
    {
        const monk  = require('monk');
        const cache = monk(process.env.MONGO_CACHE_URI).get('cache');

        cache.findOne({originalUrl:req.originalUrl}).then((doc) => {
            if(doc != undefined && doc.time && doc.time >  Date.now() - 60 * 1000){
                res.json(doc.response)
            }else{
                next();  
            }    
        });
    }
    catch (error)
    {
        var cacheErro = 'Cache erro'
        next(cacheErro);
    }
        
    
}


function limiter(err, req, res, next)
{
    if(err == 'ip')
    {
        const rateLimit = require("express-rate-limit");
        const rateLimiter = rateLimit({
            windowMs: 30*1000,
            max: 10,
            headers: true
        })
        return rateLimiter;
    }
    next();
}
  
function speedLimiter(err, req, res, next)
{
    const slowDown  = require('express-slow-down');
    const monk      = require('monk');
    const date      = new Date();
    switch(err){
        case 'ip':
            const speedLimiter = slowDown({
            windowMs: 30*1000,
            delayAfter: 1,
            delayMs: 500
            })
            return speedLimiter;
        case 'path':
            break;
        case 'path+ip':
            break;
        default:
            next();
    }
}
  
  module.exports = {
    notFound,
    errorHandler,
    log,
    cache,
    limiter,
    speedLimiter
  };
  