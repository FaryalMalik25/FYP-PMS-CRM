const mongoose = require('mongoose');
const notificationSchema = new mongoose.Schema({
    userId: String,
    count: { type: Number, default: 0 },
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;