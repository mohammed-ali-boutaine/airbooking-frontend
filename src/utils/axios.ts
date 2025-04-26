import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

interface ApiError {
  message: string;
  statusCode: number;
}

// Don't use a cached variable - always get the latest token from localStorage
const getToken = (): string | null => {
  return localStorage.getItem("token");
};

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Always get the fresh token from localStorage
    const token = getToken();

    if (token) {
      // Set Authorization header with the current token
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors
    if (error.response?.status === 401) {
      // Clear token from localStorage
      localStorage.removeItem("token");

      // Only redirect to login if we're not already on the login page
      const currentPath = window.location.pathname;
      if (
        !currentPath.includes("/login") &&
        !currentPath.includes("/register")
      ) {
        // Use history to navigate instead of direct window.location change
        window.location.href = "/login";
      }
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
