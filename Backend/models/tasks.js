const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: String,
    startDate: Date,
    deadline: Date,
    milestone: String,
    relatedTo: String,
    assignedTo: String,
    collaborators: [String],
    status: String
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
