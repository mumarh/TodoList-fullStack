const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    task: { 
        type: String,
        required: true,
        trim: true,
    },
});

const todomodel = mongoose.model('Todo', todoSchema);
module.exports = todomodel;
