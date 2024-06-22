

const express = require('express');
const router = express.Router();
const User=require('../models/User');
const Message=require('../models/Message')
const Notification=require('../models/notification')

router.post('/messages', async (req, res) => {
    const message = new Message(req.body);
    await message.save();

    // Update notification count for the recipient
    const notification = await Notification.findOne({ userId: message.to });
    if (notification) {
        notification.count += 1;
        await notification.save();
    } else {
        await new Notification({ userId: message.to, count: 1 }).save();
    }

    res.send(message);
});

// Get inbox messages
router.get('/messages/inbox/:userId', async (req, res) => {
    const messages = await Message.find({ to: req.params.userId });
    res.send(messages);
});

// Get sent messages
router.get('/messages/sent/:userId', async (req, res) => {
    const messages = await Message.find({ from: req.params.userId });
    res.send(messages);
});

// Get recipients
router.get('/recipients', async (req, res) => {
    const recipients = await User.find({ role: req.query.userType === 'client' ? 'admin' : 'client' });
    res.send(recipients);
});

// Get notifications
router.get('/notifications/:userId', async (req, res) => {
    const notification = await Notification.findOne({ userId: req.params.userId });
    res.send(notification ? notification : { userId: req.params.userId, count: 0 });
});

// Reset notifications
router.post('/notifications/reset', async (req, res) => {
    const { userId } = req.body;
    const notification = await Notification.findOne({ userId });
    if (notification) {
        notification.count = 0;
        await notification.save();
    }
    res.send({ success: true });
});

router.get('/users/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).select('fname lname');
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;

