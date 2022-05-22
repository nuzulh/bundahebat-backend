const router = require('express').Router();
const Doctor = require('../models/Doctor');
const verify = require('./verifyToken');

router.get('/', verify, async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.send(doctors);
    } catch(err) {
        res.status(400).send(err);
    }
});

router.get('/:id', verify, async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        res.send(doctor);
    } catch(err) {
        res.status(400).send(err);
    }
});

router.post('/', verify, async (req, res) => {
    const doctor = new Doctor({
        name: req.body.name,
        img: req.body.img,
        email: req.body.email,
        price: req.body.price
    });

    try {
        const savedDoctor = await doctor.save();
        res.send({doctor: doctor._id});
    } catch(err) {
        res.status(400).send(err);
    }
});

module.exports = router;