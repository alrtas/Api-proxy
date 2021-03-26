const apiKeys = new Map();
apiKeys.set('12345',true);

async function run(req, res, next)
{
    try
    { 
        const apiKey = req.get('X-API-KEY');
        if(apiKeys.has(apiKey))
        {
            next();
        }
        else
        {
            res.status(401);
            const error =  new Error('Invalid API KEY');
            next(error);
        }
    }
    catch(err)
    {
        next(err);
    }
}

module.exports = {run};