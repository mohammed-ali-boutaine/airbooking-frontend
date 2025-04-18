// store/useUserStore.ts

import { UserType } from "../types";
import { create } from "zustand";
import axiosInstance from "../utils/axios";

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
  logout: () => void;
};

let cachedToken: string | null = localStorage.getItem("token");

export const useUserStore = create<Store>((set) => ({
  user: null,
  token: cachedToken,
  loading: true,
  error: null,

  setUser: (user, token) => {
    cachedToken = token;
    localStorage.setItem("token", token);
    set({ user, token, error: null });
  },

  fetchUserFromToken: async () => {
    if (!cachedToken) return set({ loading: false });

    try {
      const response = await axiosInstance.get<ApiResponse>("/me");
      const user = response.data.user;
      set({ user, loading: false });
    } catch {
      // console.error("Token invalid or expired", error);
      localStorage.removeItem("token");
      cachedToken = null;
      set({
        user: null,
        token: null,
        loading: false,
      });
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    cachedToken = null;
    set({ user: null, token: null, error: null });
  },
}));
