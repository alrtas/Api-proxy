const mongoose = require('mongoose');

const cacheSchema = mongoose.Schema({
    time: Date,
    originalUrl: String,
    response: Object
},
{   collection: 'cache'   })  


module.exports = mongoose.model('Cache', cacheSchema);