import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://localhost:3000/api/v1",
  // timeout: 10000,
});

export default api;

// https://github.com/Scrubbe-dev/waiting-page.git