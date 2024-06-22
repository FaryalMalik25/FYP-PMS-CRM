
const mongoose = require('mongoose');
const { Schema } = mongoose;

const issueSchema = new Schema({

    projectKey: { type: String, required: true },  // Linking to Project Schema if needed
    issueType: { type: String, required: true },
    summary: { type: String, required: true },
    priority: { type: String, required: true },
    dueDate: { type: Date, required: false },
  
   
}, { timestamps: true });

const Issue = mongoose.model('Issue', issueSchema);
module.exports = Issue;




