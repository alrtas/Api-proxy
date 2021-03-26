require('dotenv').config();

const express     = require('express');
const morgan      = require('morgan');
const helmet      = require('helmet');
const cors        = require('cors');
const middlewares = require('./middlewares');
const api         = require('./api');
const db          = require('./db');
const app         = express();

db.connect();

app.set('trust proxy', 1);
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());


app.use('/',
        middlewares.log.run,
        //middlewares.limiter.run,
        middlewares.cache.run,
        api
);

app.use(middlewares.notFound.run);
app.use(middlewares.errorHandler.run);

module.exports = app;