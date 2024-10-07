// src/components/TodoList.js
import React, { useState, useEffect } from "react";
import './TodoList.css';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);

  // Función para obtener las tareas de la API
  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:5000/tasks");
      if (!response.ok) {
        throw new Error('Error al obtener tareas');
      }
      const data = await response.json();
      console.log("Datos recibidos:", data); // Log para verificar la respuesta
      if (Array.isArray(data)) {
        setTasks(data);
      } else {
        console.error("La respuesta no es un arreglo:", data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Cargar tareas al iniciar el componente
  useEffect(() => {
    fetchTasks(); 
  }, []);

  // Función para agregar o editar tareas
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (task) {
      const method = editingTask ? "PUT" : "POST"; // PUT para editar, POST para crear
      const url = editingTask
        ? `http://localhost:5000/tasks/${editingTask._id}`
        : "http://localhost:5000/tasks";

      try {
        const response = await fetch(url, {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: task }),
        });

        if (response.ok) {
          const data = await response.json(); // Obtener la respuesta
          console.log("Tarea añadida o editada:", data); // Log para verificar la tarea añadida
          fetchTasks(); // Volver a obtener la lista de tareas
          setTask(""); // Limpiar input
          setEditingTask(null); // Resetear el estado de edición
        } else {
          console.error("Error al añadir/editar tarea");
        }
      } catch (error) {
        console.error("Error en la petición:", error);
      }
    }
  };

  // Función para eliminar tareas
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchTasks(); // Volver a obtener la lista de tareas
      } else {
        console.error("Error al eliminar tarea");
      }
    } catch (error) {
      console.error("Error en la petición de eliminación:", error);
    }
  };

  // Función para cargar una tarea en el input para editar
  const handleEdit = (task) => {
    setEditingTask(task);
    setTask(task.title); // Cargar el título de la tarea en el input
  };

  return (
    <div>
      <h1>Lista de Tareas</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Nueva tarea"
        />
        <button type="submit">{editingTask ? "Actualizar" : "Agregar"}</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title}
            <button onClick={() => handleEdit(task)}>Editar</button>
            <button onClick={() => handleDelete(task._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
