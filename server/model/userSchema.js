
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    phone: {
        type: Number,
        required: true
    },

    work: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    cpassword: {
        type: String,
        required: true
    }
})

const Users = mongoose.model('User', userSchema)

module.exports = Users