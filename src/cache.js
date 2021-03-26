const Cache = require('./models/cache');

async function set(data, uri) {
    try 
    {
        const cache = new Cache({
            time: Date.now(),
            originalUrl: uri,
            response: data
        })

        await Cache.findOneAndUpdate({originalUrl: uri},
            {$set:{time:cache.time,response:cache.response}},
            {new: true},
            (err,doc) => {
                if(doc == null) 
                    cache.save();
        })
    }
    catch (error) 
    {
        console.dir('error on setting cache on database')
    }
}

module.exports = {  set  };