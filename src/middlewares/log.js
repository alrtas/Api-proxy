const Log = require('../models/log');

async function run(req, res, next)
{
    try
    {
        const log  = new Log({
            time        : Date.now(),
            baseUrl     : req.baseUrl,
            originalUrl : req.originalUrl,
            path        : req.path,
            method      : req.method,
            protocol    : req.protocol,
            hostName    : req.hostname,  
            ip          : req.ip,
        })
        await log.save();
        next();
    }
    catch(err)
    {
        next(err);
    }
}

module.exports = {run};