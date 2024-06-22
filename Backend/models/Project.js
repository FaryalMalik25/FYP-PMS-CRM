
const mongoose = require('mongoose');
const issueSchema = require('./Issue').schema;
const { Schema } = mongoose;


const projectSchema = new Schema({
   
    projectName: { type: String, required: true },
    projectKey: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  
  
});


const Project = mongoose.model('Project', projectSchema);
module.exports = Project;













