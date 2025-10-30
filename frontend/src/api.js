import axios from 'axios';

const api = axios.create({
  baseURL: 'http://my-feedback-app:4000/api'   // ✅ Use container name instead of localhost
});

export default api;
