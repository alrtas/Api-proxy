const express       = require('express');
const axios         = require('axios');
const cache         = require('../../cache');
const middlewares   = require('../../middlewares')


const router = express.Router();
const BASE_URL = 'https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?&table=exoplanets&format=ipac&where=pl_kepflag=1';


router.get('/',
    middlewares.security.run,
    async (req, res, next) => {
        try
        {   
            const { data } = await axios.get(`${BASE_URL}`)
            
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