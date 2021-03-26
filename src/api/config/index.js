const express       = require('express');
const logs          = require('./logs');
const caches        = require('./caches');
const limiters      = require('./limiters');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Config API Proxy - Allowed paths: /logs, /limiter, /cache'
  });
});

router.use('/logs', logs);
router.use('/caches', caches);
router.use('/limiters', limiters);

module.exports = router;
