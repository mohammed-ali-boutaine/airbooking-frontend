import axios, { AxiosResponse } from "axios";

export const baseUrl = "http://localhost:8000/api";

// Create a reusable axios instance
const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper function to get Authorization Header
const getAuthHeader = (isPrivate: boolean) => ({
  Authorization: isPrivate
    ? `Bearer ${localStorage.getItem("token")}`
    : undefined,
});

// Interfaces
interface GetRequestProps  {
  url: string;
  isPrivate?: boolean;
}

interface PostRequestProps  {
  url: string;
  body: object;
//     body: Record<string, any>;
  isPrivate?: boolean;
}

//  postRequest
export const postRequest = async ({
  url,
  body,
  isPrivate = false,
}: PostRequestProps ): Promise<AxiosResponse> => {
  return axiosInstance.post(url, body, {
    headers: getAuthHeader(isPrivate),
  });
};

// getRequest
export const getRequest = async ({
  url,
  isPrivate = false,
}: GetRequestProps ): Promise<AxiosResponse> => {
  return axiosInstance.get(url, {
    headers: getAuthHeader(isPrivate),
  });
};
