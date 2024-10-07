// src/api/auth.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/auth'; // Cambia esto a tu URL de backend

export const registerUser = async (username, password) => {
    return await axios.post(`${API_URL}/register`, { username, password });
};

export const loginUser = async (username, password) => {
    return await axios.post(`${API_URL}/login`, { username, password });
};
