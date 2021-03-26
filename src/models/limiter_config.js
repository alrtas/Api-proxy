const mongoose = require('mongoose');
const db        = require('../db');
db.connect()

const limiterSchema = mongoose.Schema(
    {
        config    : {
            type: String,
            required: true
        },
        window      : {
            type: Number,
            required: true
        },
        requestes    : {
            type: Number,
            required: true
        },
        type : {
            type: String,
            required: true
        },
        activated : {
            type: Boolean,
            required: true
        },
    },
    { timestamps: { createdAt: 'created_at' } },
    {   collection: 'configurations'   }
)  

module.exports = mongoose.model('Limiter', limiterSchema);