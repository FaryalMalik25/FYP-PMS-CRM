
const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoices');
const Project=require('../models/Project');
const User=require('../models/User');
const authenticateToken=require('../authMiddleware');
const payments=require('../models/Payment')
const mongoose=require('mongoose')


router.get('/projects/:clientId', authenticateToken, async (req, res) => {
    try {
        console.log("Requested URL:", req.originalUrl); // Log the original URL
        console.log("Client ID:", req.params.clientId); 
        const projects = await Project.find({ createdBy: req.params.clientId });
        if (projects.length === 0) {
            return res.status(404).send("No projects found for this client ID");
        }
        res.json(projects);
    } catch (err) {
        console.error("Error fetching projects:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
});








router.get('/count', async (req, res) => {
    try {
        const count = await Invoice.countDocuments();
        res.json({ count });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
});

router.post('/', async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.body.client) || !mongoose.Types.ObjectId.isValid(req.body.project)) {
        return res.status(400).json({ message: 'Invalid client or project ID format.' });
    }
  
    const invoice = new Invoice({
        billDate: req.body.billDate,
        dueDate: req.body.dueDate,
        client: req.body.client,
        project: req.body.project,
        totalInvoiced: req.body.totalInvoiced,
        note: req.body.note,
        paymentReceived: 0,
        due: req.body.totalInvoiced,
        status: 'Draft'
    });
    invoice.updateStatus();
    console.log('Received client ID:', req.body.client);
    console.log('Received project ID:', req.body.project);

    try {
        
        const newInvoice = await invoice.save();
        res.status(201).send(newInvoice);
    } catch (err) {
        console.error('Failed to create an invoice:', err);
        res.status(400).json({ message: err.message });
    }
  });




// Get all invoices
router.get('/', authenticateToken, async (req, res) => {
    try {
        const invoices = await Invoice.find()
        .populate({
            path: 'client',
            select: 'fname lname email' // Include 'name' and also explicitly list 'fname' and 'lname'
        })
           .populate('project', 'projectName');
           if (invoices.length === 0) {
            console.log('No invoices found');
          } 
        console.log(invoices)
            res.json(invoices);
       
    } catch (err) {
        console.error('Error fetching invoices:', err);
        res.status(500).json({ message: err.message });
    }
});

router.get('/totals', async (req, res) => {
    try {
        const totalInvoices = await Invoice.aggregate([
            { $group: { _id: null, total: { $sum: "$totalInvoiced" } } }
        ]);
        const totalPayments = await Invoice.aggregate([
            { $group: { _id: null, total: { $sum: "$paymentReceived" } } }
        ]);
        const due = await Invoice.aggregate([
            { $group: { _id: null, total: { $sum: "$due" } } }
        ]);

        res.json({
            totalInvoices: totalInvoices.length ? totalInvoices[0].total : 0,
            totalPayments: totalPayments.length ? totalPayments[0].total : 0,
            due: due.length ? due[0].total : 0,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});










// Get a single invoice by id
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id)
            .populate('client', 'fname lname email') // Include necessary fields of the client
            .populate('project', 'projectName'); // Include necessary fields of the project

        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }
        res.json(invoice);
    } catch (err) {
        console.error('Error fetching invoice:', err);
        res.status(500).json({ message: err.message });
    }
});








router.get('/client/:clientId', authenticateToken, async (req, res) => {
    try {
      const clientId = req.params.clientId;
      const invoices = await Invoice.find({ client: clientId }).populate('project');
      res.json(invoices);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  router.put('/:id', (req, res) => {
    Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(invoice => res.json(invoice))
      .catch(err => {
        console.error(err);
        res.status(400).json({ error: 'Failed to cast client ID', details: err.message });
      });
  });


  router.put('/:id', async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id);
        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }

        Object.assign(invoice, req.body);
        invoice.updateStatus();  // Calculate status before saving
        const updatedInvoice = await invoice.save();
        res.json(updatedInvoice);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Failed to update invoice', details: err.message });
    }
});


router.post('/:id/payments', async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id);
        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }

        const payment = new Payment(req.body);
        await payment.save();

        invoice.payments.push(payment._id);
        invoice.paymentReceived += payment.amount;
        invoice.due = invoice.totalInvoiced - invoice.paymentReceived;
        invoice.updateStatus();  // Recalculate status
        const updatedInvoice = await invoice.save();

        res.status(201).send({ invoice: updatedInvoice, payment });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error processing payment: ' + err.message);
    }
});


  router.get('/:id', async (req, res) => {
    try {
      const invoice = await Invoice.findById(req.params.id).populate('payments');
      if (!invoice) {
        return res.status(404).send('Invoice not found');
      }
  
     
      res.send({
        _id: invoice._id,
        billDate: invoice.billDate,
        dueDate: invoice.dueDate,
        client: invoice.client,
        project: invoice.project,
        totalInvoiced: invoice.totalInvoiced,
        note: invoice.note,
        __v: invoice.__v,
        due: invoice.due,
        paymentReceived: invoice.paymentReceived,
        payments: invoice.payments,
        status: invoice.status
      });
    } catch (error) {
      console.error('Error fetching invoice:', error); 
      res.status(500).send('Internal Server Error');
    }
  });

  
  
// Delete an invoice
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedInvoice = await Invoice.findByIdAndDelete(id);

        if (!deletedInvoice) {
            return res.status(404).send('Invoice not found');
        }

        res.send({ message: 'Invoice deleted successfully', deletedInvoice });
    } catch (error) {
        res.status(500).send('Error deleting invoice: ' + error);
    }
});








router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id)
            .populate('client', 'fname lname email')
            .populate('project', 'projectName');
        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }
        res.json(invoice);
    } catch (err) {
        console.error('Error fetching invoice:', err);
        res.status(500).json({ message: err.message });
    }
});






module.exports = router;
