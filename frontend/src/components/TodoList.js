import React, { useState, useEffect } from "react";

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
      console.log("Datos recibidos:", data);
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
      const method = editingTask ? "PUT" : "POST"; 
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
          const data = await response.json();
          console.log("Tarea añadida o editada:", data);
          fetchTasks();
          setTask("");
          setEditingTask(null);
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
        fetchTasks();
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
    setTask(task.title);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Lista de Tareas</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="flex items-center border-b border-b-2 border-blue-500 py-2">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Nueva tarea"
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          />
          <button
            type="submit"
            className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {editingTask ? "Actualizar" : "Agregar"}
          </button>
        </div>
      </form>

      <ul className="mt-6 w-full max-w-lg bg-white shadow-md rounded-lg p-4">
        {tasks.map((task) => (
          <li
            key={task._id}
            className="flex justify-between items-center py-2 border-b border-gray-200"
          >
            <span className="text-gray-800">{task.title}</span>
            <div className="flex space-x-4">
              <button
                onClick={() => handleEdit(task)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(task._id)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
