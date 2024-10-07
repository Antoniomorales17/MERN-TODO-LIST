const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Task = require('./models/task'); // Asegúrate de que la ruta sea correcta

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Para poder leer el cuerpo de las peticiones

// Conectar a MongoDB Atlas
mongoose.connect('mongodb+srv://antoniomoragimenez:GPyWSmjJBsVuyIZA@cluster0.5uuj42n.mongodb.net/todolist?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB Atlas'))
.catch(err => console.log('Error al conectar a MongoDB Atlas:', err));

// Rutas
// Crear una nueva tarea
app.post("/tasks", async (req, res) => {
    const { title } = req.body; // Aquí extraemos el campo 'title'
    
    if (!title) {
        return res.status(400).send({ message: "Title is required" }); // Manejo de error si 'title' está vacío
    }
  
    const newTask = new Task({ title }); // Aquí creamos una nueva tarea usando el modelo
    await newTask.save(); // Guardamos la tarea en la base de datos
    res.status(201).json(newTask); // Enviamos la tarea creada como respuesta
});

// Obtener todas las tareas
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Actualizar una tarea
app.put('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    try {
        const updatedTask = await Task.findByIdAndUpdate(id, { title }, { new: true });
        res.json(updatedTask);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Eliminar una tarea
app.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Task.findByIdAndDelete(id);
        const tasks = await Task.find(); // Obtener la lista actualizada
        res.json(tasks);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
