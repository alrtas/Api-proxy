const express       = require('express');
const axios         = require('axios');
const cache         = require('../../cache');
const middlewares   = require('../../middlewares');

const router = express.Router();
const BASE_URL = 'https://api.nasa.gov/insight_weather/?';

router.get('/',
    middlewares.security.run,
    async (req, res, next) => {
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
    }
);

module.exports = router;