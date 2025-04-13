// import axios, { AxiosResponse, AxiosError } from "axios";
// import api from "./api";

// export const baseUrl = "http://localhost:8000/api";

// Create a reusable axios instance
// const axiosInstance = axios.create({
//   baseURL: baseUrl,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// Helper function to get Authorization Header
// const getAuthHeader = (isPrivate: boolean) => ({
//   Authorization: isPrivate
//     ? `Bearer ${localStorage.getItem("token")}`
//     : undefined,
// });

// Interfaces
// interface GetRequestProps {
//   url: string;
//   isPrivate?: boolean;
// }

// interface PostRequestProps {
//   url: string;
//   body: object;
//   isPrivate?: boolean;
// }

// interface RequestConfig {
//   url: string;
//   body: any;
//   headers?: Record<string, string>;
// }

// // postRequest
// export const postRequest = async <T>({
//   url,
//   body,
//   headers = {},
// }: RequestConfig): Promise<T> => {
//   try {
//     const response = await api.post(url, body, { headers });
//     return response.data;
//   } catch (error) {
//     throw error as AxiosError;
//   }
// };

// // getRequest
// export const getRequest = async ({
//   url,
//   isPrivate = false,
// }: GetRequestProps): Promise<AxiosResponse> => {
//   return axiosInstance.get(url, {
//     headers: getAuthHeader(isPrivate),
//   });
// };
