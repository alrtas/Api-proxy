const express   = require('express');
const Cache     = require('../../models/cache_config');
const router    = express.Router();

router.get('/',async(req, res, next) => {
    try 
    {
        const items = await Cache.find({config: req.baseUrl});
        if(items.length == 0)
            res.status(204)
        res.json(items);
    } 
    catch (error) 
    {
        next(error)
    }
})
router.post('/', async(req, res, next) => {
    try 
    {
        const config = {config: req.originalUrl}
        const body   = req.body
        const items = await Cache.countDocuments(config);
        
        if(items != 0){
            res.status(409);
            const error = new Error('A document with this configuration already exists, use the put method to make changes');
            next(error); 
        }
        else{
            const cache = new Cache({ ...config, ...body });
            await cache.validate()
                        .catch(err => {
                            res.status(400);
                            next(err); 
                        })
            const id = await cache.save();
            res.json({message:'success',id:id._id})
        }
    }
    catch(error)
    {
        next(error)
    }
})
router.put('/', async(req, res, next) => {
    try 
    {
        const config = {config: req.originalUrl}
        const body   = req.body
        const cache = new Cache({ ...config, ...body });

        await cache.validate()
                        .catch(err => {
                            res.status(400);
                            next(err); 
        })
        
        let updated = await Cache.findOneAndUpdate(
            config,
            { ...config, ...body },
            {new: true}
        )

        if(updated == null){
            res.status(404);
            const error =  new Error(`Configuration does not exist in database, please first create usign a POST method`)
            next(error);
        }else{
            res.json({message:'success'});
        }  
    }
    catch(error)
    {
        next(error)
    }
})
router.delete('/', async(req, res, next) => {
    try 
    {
        new Cache();
        let deleted = await Cache.deleteOne({ config: req.originalUrl });
        if(deleted.deletedCount == 0){
            res.status(404);
            const error =  new Error(`Configuraton ${req.originalUrl} does not exist to be deleted`)
            next(error);
        }else{
            res.json({message:`success`});
        }        
    }
    catch(error)
    {
        next(error)
    }   
})

module.exports = router;