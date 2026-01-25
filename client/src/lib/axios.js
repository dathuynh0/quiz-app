import axios from "axios";
import { useAuthStore } from "../stores/useAuthStore.js";
import { authService } from "../services/authService.js";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
});

// gan accessToken vao req.headers
api.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

//
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalReq = error.config;
    const { setAccessToken } = useAuthStore.getState();
    if (error.response.status === 401) {
      try {
        const { accessToken } = await api.post("/auth/refresh", {
          withCredentials: true,
        });

        setAccessToken(accessToken);

        if (accessToken) {
          originalReq.headers.Authorization = `Bearer ${accessToken}`;
        }

        return api(originalReq);
      } catch (refreshError) {
        await authService.getState().signOut();
        return Promise.reject(refreshError);
      }
    }
  },
);

export default api;
