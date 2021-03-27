const limiters          = require('../limiters')
const Limiters_config   = require('../models/limiter_config');
const windowMs          = ((process.env.LIMMITER_WINDOWMS*60)*60*1000) || 60*60*1000;
const max               = process.env.LIMMITER_MAX || 20;
const choice            = process.env.LIMMITER_TYPE || 'ippath';
const delayTime         = process.env.LIMITTER_TIMER || 100;
const delay             = ms => new Promise(resolve => setTimeout(resolve, ms))

async function run(req, res, next)
{ 
    try 
    {
        const config = await setup();
        if(!config.activated){
            next();
        }
        else
        {
            const limiter = {
                path    : limiters.path(config.window, req.originalUrl),
                ippath  : limiters.ippath(config.window, req.originalUrl, req.ip),
                ip      : limiters.ip(config.window, req.ip)
            }
            const items = await limiter[config.type];
            if(items > config.requestes)
            {
                await delay((items-config.requestes)*delayTime)
                res.status(429);
                const err = new Error(`Too many requests`);
                next(err);   
            }
            next();    
        }
    } 
    catch (err) 
    {
        next(err);
    }
}

async function setup()
{
    try 
    {
        const items = await Limiters_config.find({config: '/config/limiters'});
        if(items.length == 0){
            return obj = {
                window      : windowMs,
                requestes   : max,
                type        : choice,
                activated   : true
             }
        }else{
            return items;
        }
    } 
    catch (error) 
    {
        console.dir('Fatal error on limiter configuration: '+error);
        setup();
    }
}
module.exports = {run};