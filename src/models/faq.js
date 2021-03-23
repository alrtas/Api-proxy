const mongoose = require('mongoose');

const faqSchema = mongoose.Schema({
    question    : {
        type: String,
        required: true
    },
    answer      : {
        type: String,
        required: true
    },
    videoUrl    : {
        type: String,
        required: false
    },
},
{   collection: 'faqs'   })  

module.exports = mongoose.model('Faq', faqSchema);