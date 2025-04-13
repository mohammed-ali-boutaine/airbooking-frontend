// store/useUserStore.ts
import { create } from "zustand";
import axiosInstance from "../utils/axios";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
  updated_at: string;
};

type Store = {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  setUser: (user: User, token: string) => void;
  fetchUserFromToken: () => Promise<void>;
  logout: () => void;
};

let cachedToken: string | null = localStorage.getItem("token");

export const useUserStore = create<Store>((set) => ({
  user: JSON.parse(localStorage.getItem("user") || "null"),
  token: cachedToken,
  loading: true,
  error: null,

  setUser: (user, token) => {
    cachedToken = token;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    set({ user, token, error: null });
  },

  fetchUserFromToken: async () => {
    if (!cachedToken) {
      set({ loading: false, user: null, token: null });
      return;
    }

    set({ loading: true, error: null });

    try {
      const response = await axiosInstance.get<User>("/api/me");
      console.log("user from api", response.data);

      const user = response.data;
      set({ user, token: cachedToken, loading: false });
    } catch (error) {
      console.error("Token invalid or expired", error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      cachedToken = null;
      set({
        user: null,
        token: null,
        loading: false,
        error: "Session expired. Please log in again.",
      });
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    cachedToken = null;
    set({ user: null, token: null, error: null });
  },
}));
