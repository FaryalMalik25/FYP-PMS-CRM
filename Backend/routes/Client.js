const express = require('express');
const router = express.Router();
const Client = require('../models/Client'); // Path might differ based on your structure
const User=require('../models/User');

// Get all clients
// Assuming you have a role field in your user schema
router.get('/', async (req, res) => {
    try {
        const clients = await User.find({ role: 'client' }).select('email fname lname');
        res.json(clients.map(client => ({
            _id: client._id,
            email: client.email,
            name: `${client.fname} ${client.lname}` // Combining first name and last name
        })));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Get one client
router.get('/:id', getClient, (req, res) => {
    res.json(res.client);
});


//get one client by id 
router.get('/:id', async (req, res) => {
    try {
        const client = await User.findById(req.params.id).select('email fname lname phone');
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }
        res.json(client);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create new client
router.post('/', async (req, res) => {
    const client = new Client({
        email: req.body.email,
        password: req.body.password // Consider hashing the password
    });
    try {
        const newClient = await client.save();
        res.status(201).json(newClient);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


router.post('/', async (req, res) => {
    const client = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        // role: {'client','admin'},
    });
    try {
        const newClient = await client.save();
        res.status(201).json(newClient);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});



// Update client
router.patch('/:id', getClient, async (req, res) => {
    if (req.body.email != null) {
        res.client.email = req.body.email;
    }
    if (req.body.password != null) {
        res.client.password = req.body.password; // Consider hashing the password
    }
    try {
        const updatedClient = await res.client.save();
        res.json(updatedClient);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete client
router.delete('/:id', getClient, async (req, res) => {
    try {
        await res.client.remove();
        res.json({ message: 'Deleted Client' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


async function getClient(req, res, next) {
    let client;
    try {
        client = await Client.findById(req.params.id);
        if (client == null) {
            return res.status(404).json({ message: 'Cannot find client' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.client = client;
    next();
}

module.exports = router;
