import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://localhost:7147/api",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar token JWT automáticamente
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar respuestas y errores
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ERR_NETWORK") {
      console.error("Error de conexión con la API:", error.message);
      alert("No se pudo conectar con el servidor. Inténtalo más tarde.");
    } else if (error.response) {
      const status = error.response.status;
      const data = error.response.data;
      console.error(`Error en la respuesta (${status}):`, data);

      if (status === 401 || status === 403) {
        console.warn("Acceso no autorizado. Puedes redirigir al login.");
        // window.location.href = "/login"; // Habilítalo si deseas redirección automática
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

