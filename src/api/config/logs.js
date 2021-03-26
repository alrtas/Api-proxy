const express   = require('express');
const router    = express.Router();


router.get('/',async(req, res, next) => {
    try 
    {
        res.json('get a log item');
    } 
    catch (error) 
    {
        console.dir('ERROR:'+error)
        next(error)
    }
})
router.post('/', async(req, res, next) => {
    try 
    {
        res.json('create a log item');
    }
    catch(error)
    {
        next(error)
    }
})
router.put('/', async(req, res, next) => {
    try 
    {
        res.json('update a log item');
    }
    catch(error)
    {
        next(error)
    }
})
router.delete('/', async(req, res, next) => {
    try 
    {
        res.json('delete a log item');
    }
    catch(error)
    {
        next(error)
    }   
})

module.exports = router;