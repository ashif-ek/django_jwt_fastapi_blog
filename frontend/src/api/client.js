import axios from "axios";

const api = axios.create({
  // baseURL: "https://django-jwt-fastapi-blog-backend-1.onrender.com/api/",
  // baseURL: "http://127.0.0.1:8000/api/",
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const raw = window.localStorage.getItem("auth");
  if (raw) {
    try {
      const { access } = JSON.parse(raw);
      if (access) {
        config.headers.Authorization = `Bearer ${access}`;
      }
    } catch {
      // ignore
    }
  }
  return config;
});

export default api;
