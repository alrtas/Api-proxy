const express   = require('express');
const cache     = require('../cache');
const router    = express.Router();

router.get('/',async (req, res, next) => {
    res.json('here');
});

//Traffic by target
//Response time
//Error rates
//Total traffic by day/hour
