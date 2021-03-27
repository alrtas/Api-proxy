const express     = require('express');
const total       = require('./total');
const router      = express.Router();

router.get('/', (req, res) => {
    res.json({
      message: 'All the APIs about api proxy usage that you need'
    });
});

router.use('/totals', total);


module.exports = router;