const Payment = require('./models/Payment');
const Invoice = require('./models/Invoices');

exports.processPayment = async (req, res) => {
  const { invoiceId, amount } = req.body;

  try {
    const newPayment = new Payment(req.body);
    await newPayment.save();

    const invoice = await Invoice.findById(invoiceId);
    if (!invoice) {
      return res.status(404).send('Invoice not found');
    }

    // Update the invoice with the new payment
    invoice.payments.push(newPayment._id);
    invoice.paymentReceived += amount;
    invoice.due = invoice.totalInvoiced - invoice.paymentReceived;
    invoice.updateStatus();
    await invoice.save();

    // Recalculate due amounts for the entire project
    const projectInvoices = await Invoice.find({ project: invoice.project });
    const totalInvoiced = projectInvoices.reduce((sum, inv) => sum + inv.totalInvoiced, 0);
    const totalPaymentsReceived = projectInvoices.reduce((sum, inv) => sum + inv.paymentReceived, 0);
    const projectDue = totalInvoiced - totalPaymentsReceived;

    // Respond with the updated invoice and payment info
    res.status(201).send({ invoice, newPayment, projectDue });
  } catch (error) {
    res.status(500).send('Error processing payment: ' + error.message);
  }
};


