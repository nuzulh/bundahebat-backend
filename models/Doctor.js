const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 255
    },
    img: {
        type: String,
        required: false,
        max: 255
    },
    email: {
        type: String,
        required: true,
        max: 255
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Doctor', doctorSchema);