async function set(data, uri) {
    try 
    {
        const db        = require('./db');
        const Cache     = require('./models/cache');
        const mongoose  = await db.connect();

        const cache = new Cache({
            _id: new mongoose.Types.ObjectId(),
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