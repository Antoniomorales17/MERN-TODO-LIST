// models/task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

// Crea el modelo de Task
const Task = mongoose.model('Task', taskSchema);

// Exporta el modelo para poder usarlo en otras partes de la aplicación
module.exports = Task;
