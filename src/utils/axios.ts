import axios, { AxiosError, InternalAxiosRequestConfig    } from "axios";


// error type for api 
interface ApiError {
  message: string;
  statusCode: number;
}

// Axios instance with base url from .env 
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  }
});

// Add token to every request
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig  ) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


// Auto logout on 401
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const handleApiError = (error: AxiosError<ApiError>): string => {
  return error.response?.data?.message || "Something went wrong!";
};

export default axiosInstance;
