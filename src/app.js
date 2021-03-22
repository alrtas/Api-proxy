const express     = require('express');
const morgan      = require('morgan');
const helmet      = require('helmet');
const cors        = require('cors');


require('dotenv').config();

const middlewares = require('./middlewares');
const api         = require('./api');

const app = express();
app.set('trust proxy', 1);

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());


//Here is the important stuff is going on

app.use('/',middlewares.log, middlewares.limiter(), middlewares.speedLimiter(), api);




app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
