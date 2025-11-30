import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
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
