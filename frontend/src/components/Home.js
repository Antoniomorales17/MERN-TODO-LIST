// src/components/Home.js
import React from 'react';

const Home = () => {
    return (
        <div>
            <h1>Bienvenido a la aplicación de tareas</h1>
            <p>Aquí podrás gestionar tus tareas.</p>
            <a href="/todos">Ir a la lista de tareas</a> {/* Enlace a la lista de tareas */}
        </div>
    );
};

export default Home;
