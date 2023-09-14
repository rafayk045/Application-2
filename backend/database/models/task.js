const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        minLength: 3
    },
    _listId: {
        type: mongoose.Types.ObjectId,
        ref: 'List',
        required: true //no task could exist without a List Id
    },
    completed: {
        type: Boolean,
        default: false,
    }
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;