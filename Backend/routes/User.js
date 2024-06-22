const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Invoice = require('../models/Invoices');
const Project = require('../models/Project');


// Create a new user
router.post('/', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (err) {
        res.status(400).send(err);
    }
});




// Get all clients with additional data
router.get('/', async (req, res) => {
    try {
        const clients = await User.find({ role: 'client' }).select('email fname lname ');

        const clientDetails = await Promise.all(clients.map(async client => {
            const invoices = await Invoice.find({ client: client._id });
            const totalInvoiced = invoices.reduce((acc, invoice) => acc + invoice.totalInvoiced, 0);
            const paymentReceived = invoices.reduce((acc, invoice) => acc + invoice.paymentReceived, 0);
            const due = invoices.reduce((acc, invoice) => acc + invoice.due, 0);
            const projects = await Project.find({ createdBy: client._id }).countDocuments();
            
            return {
                _id: client._id,
                name: `${client.fname} ${client.lname}`,
                email: client.email,
                totalInvoiced,
                paymentReceived,
                due,
                projects
            };
        }));

        res.json(clientDetails);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;


// Get a user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Update a user
router.patch('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Delete a user
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
