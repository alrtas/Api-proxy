const express = require('express');

const emojis = require('./emojis');
const marsWeather = require('./mars-wheater')
const faqs =  require('./faqs');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/emojis', emojis);
router.use('/mars-weather', marsWeather);
router.use('/faqs',faqs);

module.exports = router;
