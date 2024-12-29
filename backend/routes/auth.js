const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const router = express.Router();
const secretKey = process.env.JWT_SECRET;

router.post('/signup', (req, res) => {
    
    const { username, password } = req.body;
    console.log(req.body)
    User.create({ username, password }, (err) => {
        if (err) {
            console.log
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'User created successfully!' });
    });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    User.findByUsername(username, (err, user) => {
        if (err || !user)
            return res.status(401).json({ error: 'Invalid username or password' });

        bcrypt.compare(password, user.password, (err, result) => {
            
            if (err || !result) {
                console.log(err)
                console.log(result)
                return res.status(401).json({ error: 'Invalid username or password' });

            }

            const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });
            res.json({ token });
        });
    });
});

module.exports = router;
