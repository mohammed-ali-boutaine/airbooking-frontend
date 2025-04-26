// store/useUserStore.ts
import { UserType } from "../types";
import { create } from "zustand";
import axiosInstance from "../utils/axios";
import axios, { AxiosError } from "axios";
// import { log } from "console";

interface ApiResponse {
  user: UserType;
}

type Store = {
  user: UserType | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  setUser: (user: UserType, token: string) => void;
  fetchUserFromToken: () => Promise<void>;
  updateUser: (updatedUser: UserType) => Promise<UserType>;
  logout: () => void;
};

const getInitialToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

export const useUserStore = create<Store>((set) => ({
  user: null,
  token: getInitialToken(),
  loading: true,
  error: null,

  setUser: (user, token) => {
    localStorage.setItem("token", token);
    set({ user, token, error: null, loading: false });
  },

  fetchUserFromToken: async () => {
    const token = getInitialToken();
    if (!token) {
      set({ loading: false });
      return;
    }

    try {
      set({ loading: true, error: null });
      
      const response = await axiosInstance.get<ApiResponse>("/me");
      set({
        user: response.data.user,
        token,
        loading: false,
      });
    } catch (error) {
      console.error("Fetch user error:", error);
      localStorage.removeItem("token");
      set({
        user: null,
        token: null,
        loading: false,
        error: error instanceof Error ? error.message : "Failed to fetch user",
      });
    }
  },

  updateUser: async (updatedUser) => {
    try {
      console.log("updt",updatedUser);
      
      set({ loading: true, error: null });

      // Create FormData if we're uploading profile image
      let requestData: any = updatedUser;
      let headers = {};

      if (updatedUser.profile_path instanceof File) {
        const formData = new FormData();

        // Add all non-file fields to FormData
        Object.entries(updatedUser).forEach(([key, value]) => {
          if (value !== null && value !== undefined) {
            if (value instanceof File) {
              formData.append(key, value);
            } else if (typeof value === "object") {
              formData.append(key, JSON.stringify(value));
            } else {
              formData.append(key, String(value));
            }
          }
        });

        requestData = formData;
        headers = { "Content-Type": "multipart/form-data" };
      }

      // Use PATCH for partial updates
      const response = await axiosInstance.patch<ApiResponse>(
        "/me",
        requestData,
        { headers }
      );
      console.log(response);
      
      // Update state with the returned user data
      set({
        user: response.data.user,
        loading: false,
      });

      return response.data.user;
    } catch (error) {
      console.error("Update user error:", error);

      // Capture specific error message if available
      const errorMessage =
        axios.isAxiosError(error) && (error as AxiosError<{message: string}>).response?.data?.message
          ? (error as AxiosError<{message: string}>).response?.data.message
          : error instanceof Error
          ? error.message
          : "Failed to update user";

      set({
        loading: false,
        error: errorMessage,
      });

      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null, error: null, loading: false });
  },
}));