import axios from 'axios';

const apiUrl = import.meta.env.DEV
  ? import.meta.env.VITE_API_URL || 'http://localhost:3333'
  : 'https://discord-backend-08dc.onrender.com';

const api = axios.create({
  baseURL: apiUrl,
});

export default api;