const express       = require('express');
const marsWeather   = require('./mars-weather');
const pictureDay    = require('./picture-day');
const pictureMars    = require('./picture-mars');
const exoplanets    = require('./exoplanets')

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'All the APIs about the space that you need'
  });
});

router.use('/mars-weather', marsWeather);
router.use('/picture-day', pictureDay);
router.use('/picture-mars', pictureMars);
router.use('/exoplanets', exoplanets);

module.exports = router;
