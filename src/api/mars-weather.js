const express   = require('express');
const axios     = require('axios');
const app       = require('../app');
const cache     = require('../cache');


const router = express.Router();
const BASE_URL = 'https://api.nasa.gov/insight_weather/?';

const apiKeys = new Map();
apiKeys.set('12345',true);

router.get('/',(req, res, next) =>{
    const apiKey = req.get('X-API-KEY');
    if(apiKeys.has(apiKey))
    {
        next();
    }
    else
    {
        res.status(401);
        const error =  new Error('Invalid API KEY');
        next(error);
    }
} ,async (req, res, next) => {
    try
    {
        const params = new URLSearchParams({
            api_key: process.env.NASA_API_KEY,
            feedtype:'json',
            ver:'1.0'
        });
        
        const { data } = await axios.get(`${BASE_URL}${params}`)
        
        await cache.set(data, req.originalUrl);
        
        res.json(data)
    }
    catch(error)
    {
        next(error);
    }
});

module.exports = router;