const router = require('express').Router();
const Order = require('../models/Order');
const Doctor = require('../models/Doctor');
const verify = require('./verifyToken');

router.get('/', verify, async (req, res) => {
    try {
        const orders = await Order.find();
        res.send(orders);
    } catch(err) {
        res.status(400).send(err);
    }
});

router.get('/:id', verify, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        res.send(order);
    } catch(err) {
        res.status(400).send(err);
    }
});

router.post('/', verify, async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.body.doctor_id);
    
        const order = new Order({
            user_id: req.user._id,
            name: doctor.name,
            amount: doctor.price,
            time_book: req.body.time_book
        });

        const savedOrder = await order.save();
        res.send({order: order._id}); 
    } catch(err) {
        res.status(400).send(err);
    }
});

module.exports = router;