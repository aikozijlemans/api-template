const mongoose = require('mongoose');
const {string, number} = require("joi");

const userSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        max: 8,
        unique: true
    },
    fname: {
        type: String,
        required: true,
        max: 255
    },
    lname: {
        type: String,
        required: true,
        max: 255
    },
    username: {
        type: String,
        required: true,
        max: 255
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    avatar: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);