import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import TodoList from './components/TodoList'; 
import ProtectedRoute from './components/ProtectedRoute'; 
import Home from './components/Home'; // Si has creado un componente Home
import './index.css'; // Ajusta la ruta si es necesario


const App = () => {
    const isAuthenticated = !!localStorage.getItem('token'); // Verifica si hay un token en localStorage

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Home />} /> {/* Asegúrate de tener un componente Home */}
                <Route path="/todos" element={<ProtectedRoute element={<TodoList />} isAuthenticated={isAuthenticated} />} /> {/* Usa ProtectedRoute aquí */}
            </Routes>
        </Router>
    );
};

export default App;
