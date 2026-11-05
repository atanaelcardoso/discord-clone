import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL || 
  (import.meta.env.DEV ? 'http://localhost:3333' : 'https://discord-backend-08dc.onrender.com');

if (!apiUrl) {
  throw new Error('Configure VITE_API_URL com a URL do backend.');
}

const api = axios.create({ 
  baseURL: apiUrl 
});

export default api;