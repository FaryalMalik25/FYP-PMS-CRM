const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment')
const paymentController = require('../paymentController');
const Invoice=require('../models/Invoices')


router.post('/payments', async (req, res) => {
  try {
    const payment = new Payment(req.body);
    await payment.save();
    res.status(201).send(payment);
  } catch (error) {
    res.status(400).send(error);
  }
});


router.post('/', paymentController.processPayment);

module.exports = router;


