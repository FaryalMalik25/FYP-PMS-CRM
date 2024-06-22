
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Error checking password' });
            }
            if (!isMatch) {
                return res.status(401).json({ message: 'Incorrect password' });
            }
          
            const token = jwt.sign(
                { userId: user._id.toString() ,email: user.email}, // Convert ObjectId to string
                process.env.JWT_SECRET,
                { expiresIn: '2h' }
              );
            res.json({ token, userId: user._id, role: user.role ,fname:user.fname,lname:user.lname});
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;




