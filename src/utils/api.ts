import axios, { AxiosError, AxiosRequestConfig } from "axios";

interface ApiError {
  message: string;
  statusCode: number;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const handleApiError = (error: AxiosError<ApiError>): string => {
  return error.response?.data?.message || "An error occurred";
};

export const postRequest = async <T>({
  url,
  body,
}: {
  url: string;
  body: any;
}): Promise<T> => {
  try {
    const response = await api.post(url, body);
    return response.data;
  } catch (error) {
    throw handleApiError(error as AxiosError<ApiError>);
  }
};

export default api;
