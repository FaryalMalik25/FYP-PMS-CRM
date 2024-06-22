
const mongoose = require('mongoose');
const { Schema } = mongoose;

const clientSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }  
   
});

const Client = mongoose.model('Client', clientSchema);
module.exports = Client;

