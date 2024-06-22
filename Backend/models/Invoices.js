
const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  
    billDate: { type: Date, required: true },
    dueDate: { type: Date, required: true },
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    totalInvoiced: { type: Number, required: true },
    note: { type: String },
    displayNumber: { type: String } ,
    status: { type: String, default: 'Not Paid', enum: ['Draft', 'Not Paid', 'Partially Paid', 'Fully Paid', 'Overdue'] },
    payments: [{  
        date: Date,
        amount: Number,
        method: String,
        note: String
    }],
    paymentReceived: { type: Number, default: 0 },
    due: Number,
    payments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Payment' }]
   
});



invoiceSchema.methods.updateStatus = function () {
    console.log(`Updating status for invoice: ${this._id}`);
    console.log(`Payment Received: ${this.paymentReceived}, Total Invoiced: ${this.totalInvoiced}, Due Date: ${this.dueDate}, Current Date: ${new Date()}`);
    
    if (this.paymentReceived >= this.totalInvoiced) {
        this.status = 'Fully Paid';
    } else if (this.paymentReceived > 0) {
        this.status = 'Partially Paid';
    } else if (new Date() > this.dueDate) {
        this.status = 'Overdue';
    } else {
        this.status = 'Not Paid';
    }

    console.log(`New status: ${this.status}`);
};



const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;


