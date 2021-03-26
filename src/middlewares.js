function notFound(req, res, next) 
{
    res.status(404);
    const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
    next(error);
}

function errorHandler(err, req, res, next) 
{
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
        const Log       = require('./models/log');

        const log  = new Log({
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
        next();
    }
    catch(err)
    {
        next(err);
    }
}

async function cache(req, res, next)
{
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
            next();
        }
        else{
            res.json(item.response)
        }
            
        
    } 
    catch (err) 
    {   
        next(err);  
    }
}

async function limiter(req, res, next)
{
    const windowMs  = ((process.env.LIMMITER_WINDOWMS*60)*60*1000) || 60*60*1000;
    const max       = process.env.LIMMITER_MAX || 20;
    const choice    = process.env.LIMMITER_TYPE || 'ippath';
    const delay     = ms => new Promise(resolve => setTimeout(resolve, ms))
    
    try 
    {
        const limiters = require('./limiters')
        const limiter = {
            path    : limiters.path(windowMs, req.originalUrl),
            ippath  : limiters.ippath(windowMs, req.originalUrl, req.ip),
            ip      : limiters.ip(windowMs, req.ip)
        }
        const items = await limiter[choice];
        if(items > max)
        {
            await delay((items-max)*100)
            res.status(429);
            const err = new Error(`Too many requests`);
            next(err);   
        }
        next();    
    } 
    catch (err) 
    {
        next(err);
    }
}
  
  module.exports = {
    log,
    cache,
    limiter,
    notFound,
    errorHandler
  };
  