const Log   = require('./models/log');

/**
 * @param {number} windowMs - Number in seconds that must be evaluated
 * @param {string} uri      - URI that must be evaluated
 */
async function path(windowMs, uri)
{
    try 
    {
        const items = await Log.countDocuments({
            originalUrl: uri,
            time: { $gt: Date.now()- windowMs }
        });
        return items;
    } 
    catch (err) 
    {
        return null
    }
}

/**
 * @param {number} windowMs - Number in seconds that must be evaluated
 * @param {string} uri      - URI that must be evaluated
 * @param {string} ip       - IP that must be evaluated
 */
async function ippath(windowMs, uri, ip)
{
    try 
    {
        const items = await Log.countDocuments({
            originalUrl: uri,
            ip: ip,
            time: { $gt: Date.now()- windowMs }
        });
        return items;
    } 
    catch (err) 
    {
        return null
    }
}

/**
 * @param {number} windowMs - Number in seconds that must be evaluated
 * @param {string} ip       - IP that must be evaluated
 */
async function ip(windowMs, ip)
{
    try 
    {
        const items = await Log.countDocuments({
            ip: ip,
            time: { $gt: Date.now()- windowMs }
        });
        return items;
     } 
     catch (err) 
     {
         return null;
     }
 }
 

module.exports = { path, ippath, ip }