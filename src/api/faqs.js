const express   = require('express');
const Faq       = require('../models/faq');
const cache     = require('../cache');
const db        = require('../db');
const router    = express.Router();

db.connect()

router.get('/',async (req, res, next) => {
    try 
    {
        const items = await Faq.find({});
        await cache.set(items, req.originalUrl);
        res.json(items);
    } 
    catch (error) 
    {
        next(error);
    }

});

router.get('/:id', async (req, res, next) => {
    try 
    {
        const { id } =  req.params;
        const item = await Faq.findOne({
            _id: id,
        });
        await cache.set(item, req.originalUrl);
        if(!item) return next();
        return res.json(item);
    }
    catch (error) 
    {
        next(error);
    }
});

router.post('/',async (req, res, next) => {
    try 
    {
        const faq = new Faq(req.body);
        await faq.validate()
                 .catch(err => {
                     res.json(err.erros.answer)
        });
        const id = await faq.save();
        res.json({message:'success',id:id._id});

    } 
    catch (err) 
    {
        next(err)
    }
});

router.put('/:id', async (req, res, next) => {
    try 
    {
        const { id } =  req.params;
        const faq = new Faq(req.body);
        await faq.validate()
                 .catch(err => {
                     res.json(err.erros.answer)
        });

        let updated = await Faq.findOneAndUpdate({_id: id},
            {$set:req.body},
            {new: true}
        )
        console.dir(updated);
        if(updated == null){
            res.status(404);
            const error =  new Error(`Object id: ${id} does not exist in database`)
            next(error);
        }else{
            res.json({message:'success',id:id});
        }        
    } 
    catch (error) 
    {
        next(error);
    }
});

router.delete('/:id',async (req, res, next) => {
    try 
    {
        const { id } =  req.params;
        new Faq();
        let deleted = await Faq.findOneAndDelete({ _id:id });
        if(deleted == null){
            const error =  new Error(`Object id: ${id} does not exist in database`)
            next(error);
        }else{
            res.json({message:'success',id:id});
        }        
    } 
    catch (error) 
    {
        next(error);
    }
});

module.exports=router;