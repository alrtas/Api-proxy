const express     = require('express');
const emojis      = require('./emojis');
const space       = require('./space')
const faqs        = require('./faqs');
const config      = require('./config');
const usage       = require('./usage');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/emojis', emojis);
router.use('/space', space);
router.use('/faqs',faqs);
router.use('/config', config);
router.use('/usage', usage);

module.exports = router;
