const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) return res.status(400).send({message: 'Email has already registered.'});
    if (req.body.password.length < 6) return res.status(400).send({message: 'Password at least 6 characters.'});
    
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    
    const user = new User({
        front_name: req.body.front_name,
        back_name: req.body.back_name,
        email: req.body.email,
        password: hashPassword
    });

    try {
        const savedUser = await user.save();
        res.send({user: user._id});
    } catch(err) {
        res.status(400).send(err);
    }
});

router.post('/login', async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('Email is not found.');
    
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Invalid password');

    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token'. token).send(token);
});

module.exports = router;