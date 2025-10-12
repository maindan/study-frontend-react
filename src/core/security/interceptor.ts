import axios from "axios";
import { useAuthStore } from "@/states/AuthState"; // sua store do Zustand

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
});


api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
