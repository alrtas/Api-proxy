const limiters  = require('../limiters')
const windowMs  = ((process.env.LIMMITER_WINDOWMS*60)*60*1000) || 60*60*1000;
const max       = process.env.LIMMITER_MAX || 20;
const choice    = process.env.LIMMITER_TYPE || 'ippath';
const delay     = ms => new Promise(resolve => setTimeout(resolve, ms))

async function run(req, res, next)
{ 
    try 
    {
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
  
module.exports = {run};