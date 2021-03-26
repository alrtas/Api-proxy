const express     = require('express');
const emojis      = require('./emojis');
const marsWeather = require('./mars-weather')
const faqs        = require('./faqs');
const config      = require('./config');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/emojis', emojis);
router.use('/mars-weather', marsWeather);
router.use('/faqs',faqs);
router.use('/config', config);

module.exports = router;
