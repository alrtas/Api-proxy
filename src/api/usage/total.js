const express = require('express');
const cache   = require('../../cache');
const Log     = require('../../models/log');
const router  = express.Router();

router.get('/', async (req, res, next) => {
    try 
    {
        const item = await Log.countDocuments({});
        await cache.set(item, req.originalUrl);
        res.json({message:"success",requests:item});
    }
    catch (error) 
    {
        next(error); 
    }
})
router.get('/start/:start/end/:end', async (req, res, next) => {
    try 
    {
        const { start, end } =  req.params;
        const item = await Log.countDocuments({
            "time": {"$gte": start,"$lte": end}
        });
        await cache.set(item, req.originalUrl);
        if(!item) return next();
        res.json({message:"success",requests:item});
    }
    catch (error) 
    {
        next(error); 
    }
})
router.get('/paths', async (req, res, next) => {
    try 
    {
        const items = await Log.find().distinct('originalUrl', function(error, ids){console.dir(ids)});
        let response = [];
        items.forEach(async (item)=>{
            const total = await Log.countDocuments({originalUrl:item});
            response.push({path:item,total:total})
        })
        
        await cache.set(items, req.originalUrl);
        if(!items) return next();
        res.json({message:"success", paths:response});
        
    }
    catch (error) 
    {
        next(error); 
    }
})

module.exports = router;