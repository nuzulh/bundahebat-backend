const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        max: 255
    },
    name: {
        type: String,
        required: false,
        max: 255
    },
    amount: {
        type: Number,
        required: true
    },
    time_book: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', orderSchema);