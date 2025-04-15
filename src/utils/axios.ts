import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

interface ApiError {
  message: string;
  statusCode: number;
}

let cachedToken: string | null = localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (cachedToken) {
      config.headers.Authorization = `Bearer ${cachedToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      cachedToken = null;
      window.location.href = "/login"; // Consider making this configurable
    }
    return Promise.reject(error);
  }
);

export const handleApiError = (error: AxiosError<ApiError>): string => {
  if (error.response) {
    return error.response.data?.message || "An error occurred.";
  }
  if (error.request) {
    return "Network error. Please check your connection.";
  }
  return error.message || "An unexpected error occurred.";
};

export default axiosInstance;
