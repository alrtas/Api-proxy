const express   = require('express');
const axios     = require('axios');
const app       = require('../app');


const router = express.Router();
const BASE_URL = 'https://api.nasa.gov/insight_weather/?';

const apiKeys = new Map();
apiKeys.set('12345',true);


let cachedData;
let cacheTime;

router.get('/',(req, res, next) =>{
    
    const apiKey = req.get('X-API-KEY');
    if(apiKeys.has(apiKey))
    {
        next();
    }
    else
    {
        const error =  new Error('Invalid API KEY');
        next(error);
        //next();
    }
} ,async (req, res, next) => {
    if(cacheTime && cacheTime > Date.now() -  30*1000)
    {
        return res.json(cachedData);
    }
    try
    {
        const params = new URLSearchParams({
            api_key: process.env.NASA_API_KEY,
            feedtype:'json',
            ver:'1.0'
        });
        
        const { data } = await axios.get(`${BASE_URL}${params}`)
        cachedData = data;
        cacheTime = Date.now();
        data.cacheTime = cacheTime;

        res.json(data)
    }
    catch(error)
    {
        next(error);
    }
   

    //1. make a rest to nasa api

   //2. respond to this request with data from nasa api
   
});

module.exports = router;
