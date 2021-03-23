const mongoose = require('mongoose');

const cacheSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    time: Date,
    originalUrl: String,
    response: Object
},
{   collection: 'cache'   })  

module.exports = mongoose.model('Cache', cacheSchema);