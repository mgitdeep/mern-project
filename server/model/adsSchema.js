
const mongoose = require('mongoose')

const adsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    isFree: {
        type: Boolean,
        required: true
    },
    condition: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    advertiser_info: {
        type: String,
        required: true
    },
    contact_info: {
        type: String,
        required: true
    }
}, {timestamps: true} )


// Collection creation
const Ads = mongoose.model('Ad', adsSchema)

module.exports = Ads