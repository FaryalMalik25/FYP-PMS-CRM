const mongoose = require('mongoose');
const { Schema } = mongoose;

const projectUserMappingSchema = new Schema({
    projectId: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const ProjectUserMapping = mongoose.model('ProjectUserMapping', projectUserMappingSchema);
module.exports = ProjectUserMapping;
