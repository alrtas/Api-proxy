const express       = require('express');
const axios         = require('axios');
const cache         = require('../../cache');
const middlewares   = require('../../middlewares');

const router = express.Router();
const BASE_URL = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?';

router.get('/',
    middlewares.security.run,
    async (req, res, next) => {
        try
        {
            const params = new URLSearchParams({
                api_key: process.env.NASA_API_KEY,
                sol:'100'
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