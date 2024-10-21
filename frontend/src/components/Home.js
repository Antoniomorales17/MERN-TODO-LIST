import React from 'react';

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Bienvenido a la aplicación de tareas</h1>
            <p className="text-lg text-gray-600 mb-6">Aquí podrás gestionar tus tareas de manera eficiente.</p>
            <a href="/todos" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
                Ir a la lista de tareas
            </a>
        </div>
    );
};

export default Home;
