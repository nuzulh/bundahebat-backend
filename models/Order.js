const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        max: 255
    },
    doctor_id: {
        type: String,
        required: false,
        max: 255
    },
    hour: {
        type: Number,
        required: true,
        max: 255
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', orderSchema);