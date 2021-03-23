const express   = require('express');
const cache     = require('../cache');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try 
  {
    let data = ['😀', '🍺', '☘️','🚀']
    await cache.set(data, req.originalUrl);
    res.json(data);
  } 
  catch (error) 
  {
    next(error);
  }

});

module.exports = router;
