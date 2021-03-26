const Cache = require('../models/cache');

async function run(req, res, next)
{
    try 
    {
        const window =  new Date() - process.env.CACHE_TIME*1000;
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
    catch (err) 
    {   
        next(err);  
    }
}

module.exports = {run};