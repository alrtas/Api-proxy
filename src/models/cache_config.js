const mongoose = require('mongoose');

const cacheSchema_config = mongoose.Schema({
    config: {
        type: String,
        required: true
    },
    window: {
        type: Number,
        required: true
    },
    activated: {
        type: Boolean,
        required: true
    }
},
{ timestamps: { createdAt: 'created_at' } },
{   collection: 'configurations'   })


module.exports =mongoose.model('Cache_config', cacheSchema_config);