function run(err, req, res, next) 
{
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
      message: 'error',
      reason: err.message,
      stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
    });
}

module.exports = {run};