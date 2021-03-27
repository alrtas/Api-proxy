const Cache         = require('../models/cache');
const Cache_config  = require('../models/cache_config');
const windows       = process.env.CACHE_TIME || 60;

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
            const window =  new Date() - config.window*1000;
            const item = await Cache.findOne({
                originalUrl: req.originalUrl,
                time: { $gt: window}
            });

            if(item == null){
                next();
            }
            else{
                res.json(item.response)
            }
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
        const items = await Cache_config.find({config: '/config/caches'});
        if(items.length == 0){
            return obj = {
                window: windows,
                activated: true
            }
        }else{
            return items;
        }
    } 
    catch (error) 
    {
        console.dir('Fatal error on cache configuration: '+error);
        setup();
    }
}
module.exports = {run};