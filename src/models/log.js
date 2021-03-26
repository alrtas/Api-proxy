const mongoose = require('mongoose');

const logSchema = mongoose.Schema({
    time        : Date,
    originalUrl : String,
    path        : String,
    method      : String,
    protocol    : String,
    hostname    : String,
    ip          : String
},
{   collection: 'logs'   })  

module.exports = mongoose.model('Log', logSchema);