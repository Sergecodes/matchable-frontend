import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // adjust if your backend runs elsewhere
});

export default api;
