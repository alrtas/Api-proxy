const express   = require('express');
const Log       = require('../../models/log')
const cache     = require('../../cache');
const router    = express.Router();

router.get('/',async(req, res, next) => {
    try 
    {
        const item = await Log.find({});
        await cache.set(item, req.originalUrl);
        if(!item) return next();
        return res.json(item);
    } 
    catch (error) 
    {
        console.dir('ERROR:'+error)
        next(error)
    }
})
router.get('/:id',async(req, res, next) => {
    try 
    {
        const { id } =  req.params;
        const item = await Log.findOne({
            _id: id,
        });
        await cache.set(item, req.originalUrl);
        if(!item) return next();
        return res.json(item);
    } 
    catch (error) 
    {
        console.dir('ERROR:'+error)
        next(error)
    }
})
router.get('/start/:start/end/:end',async(req, res, next) => {
    try 
    {
        const { start, end } =  req.params;
        const item = await Log.find({
            "time": {"$gte": start,"$lte": end}
        });
        await cache.set(item, req.originalUrl);
        if(!item) return next();
        return res.json(item);
    } 
    catch (error) 
    {
        console.dir('ERROR:'+error)
        next(error)
    }
})
module.exports = router;