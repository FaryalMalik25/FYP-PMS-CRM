
const mongoose = require('mongoose');
const paymentSchema = new mongoose.Schema({
  invoiceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Invoices',
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['Cash', 'Debit Card'],
    required: true
  },
  paymentDate: {
    type: Date,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  note: String
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;

