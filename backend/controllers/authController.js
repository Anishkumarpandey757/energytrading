const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = (req, res) => {
    const { name, email, password } = req.body;

    User.findByEmail(email, (err, users) => {
        if (users.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        bcrypt.hash(password, 10, (err, hash) => {
            if (err) throw err;
            User.create({ name, email, password: hash }, (err, result) => {
                if (err) return res.status(500).json({ error: err });
                res.status(201).json({ message: 'User registered successfully' });
            });
        });
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    User.findByEmail(email, (err, users) => {
        if (err) return res.status(500).json({ error: err });
        if (users.length === 0) return res.status(404).json({ message: 'User not found' });

        const user = users[0];
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (!isMatch) return res.status(400).json({ message: 'Incorrect password' });

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ token });
        });
    });
};
