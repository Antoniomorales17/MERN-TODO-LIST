// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Task = require('./models/task');
const authRoutes = require('./routes/auth'); // Ruta para autenticación

const app = express();
const PORT = process.env.PORT || 5000; // Usa la variable de entorno o el puerto 5000

// Middleware
app.use(cors());
app.use(express.json()); // Para poder leer el cuerpo de las peticiones

// Conectar a MongoDB Atlas
mongoose.connect('mongodb+srv://antoniomoragimenez:GPyWSmjJBsVuyIZA@cluster0.5uuj42n.mongodb.net/todolist?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB Atlas'))
.catch(err => console.error('Error al conectar a MongoDB Atlas:', err));

// Usar las rutas de autenticación
app.use('/auth', authRoutes); // Usa las rutas de autenticación

// Rutas para tareas
// Crear una nueva tarea
app.post("/tasks", async (req, res) => {
    const { title } = req.body; // Extraemos el campo 'title'
    
    if (!title) {
        return res.status(400).send({ message: "Title is required" }); // Manejo de error si 'title' está vacío
    }
  
    const newTask = new Task({ title }); // Crear una nueva tarea usando el modelo
    await newTask.save(); // Guardar la tarea en la base de datos
    res.status(201).json(newTask); // Enviar la tarea creada como respuesta
});

// Obtener todas las tareas
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks); // Enviar la lista de tareas
    } catch (error) {
        res.status(500).send(error); // Manejo de error
    }
});

// Actualizar una tarea
app.put('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    try {
        const updatedTask = await Task.findByIdAndUpdate(id, { title }, { new: true });
        res.json(updatedTask); // Enviar la tarea actualizada
    } catch (error) {
        res.status(400).send(error); // Manejo de error
    }
});

// Eliminar una tarea
app.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Task.findByIdAndDelete(id);
        const tasks = await Task.find(); // Obtener la lista actualizada
        res.json(tasks); // Enviar la lista de tareas actualizada
    } catch (error) {
        res.status(400).send(error); // Manejo de error
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
