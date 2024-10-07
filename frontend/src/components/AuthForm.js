import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Importa Link para navegación
import { registerUser, loginUser } from '../api/auth';

const AuthForm = ({ isLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Inicializa el hook de navegación

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            if (isLogin) {
                const response = await loginUser(username, password);
                // Almacena el token en localStorage
                localStorage.setItem('token', response.data.token);
                // Redirigir después del login
                navigate('/'); // Cambia a la ruta que desees
            } else {
                await registerUser(username, password);
                // Redirigir después del registro
                navigate('/login'); // Redirige a la página de login
            }
        } catch (err) {
            setError(err.response?.data || 'Error en la autenticación');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded-lg shadow-md bg-white">
            <h2 className="text-2xl font-bold mb-4">{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</h2>
            <div className="mb-4">
                <label className="block mb-2">Nombre de Usuario:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="border border-gray-300 p-2 rounded w-full"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Contraseña:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border border-gray-300 p-2 rounded w-full"
                />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</button>

            {/* Aquí agregamos el enlace para cambiar entre login y registro */}
            {isLogin ? (
                <p className="mt-4">
                    ¿No tienes cuenta? <Link to="/register" className="text-blue-500">Regístrate aquí</Link>
                </p>
            ) : (
                <p className="mt-4">
                    ¿Ya tienes cuenta? <Link to="/login" className="text-blue-500">Inicia sesión aquí</Link>
                </p>
            )}
        </form>
    );
};

export default AuthForm;
