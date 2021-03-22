const monk      = require('monk');
const cache     = monk(process.env.MONGO_CACHE_URI).get('cache');

async function set(data, uri)
{
    const cacheData = {
        time: Date.now(),
        originalUrl: uri,
        response: data
    }
    let hasCacheRegistry = await cache.findOneAndUpdate({originalUrl: uri}, { $set: cacheData });
    if(hasCacheRegistry==null)
        await cache.insert(cacheData);
}

module.exports = {set};