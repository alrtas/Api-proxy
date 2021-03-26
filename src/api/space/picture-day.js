const express       = require('express');
const axios         = require('axios');
const cache         = require('../../cache');
const middlewares   = require('../../middlewares')


const router = express.Router();
const BASE_URL = 'https://api.nasa.gov/planetary/apod?';


router.get('/',
    middlewares.security.run,
    async (req, res, next) => {
        try
        {
            const params = new URLSearchParams({
                api_key: process.env.NASA_API_KEY
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