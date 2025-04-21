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

const getInitialToken = (): string | null => {
  if (typeof window !== 'undefined') {
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
    // cachedToken = token;
    localStorage.setItem("token", token);
    console.log(user);
    
    set({ user, token, error: null,loading:false });
  },

  fetchUserFromToken: async () => {
    // if (!cachedToken) return set({ loading: false });
    const token = getInitialToken();
    if (!token) {
      set({ loading: false });
      return;
    }


    try {
      set({  loading: true, error: null  });
      const response = await axiosInstance.get<ApiResponse>("/me");
      console.log(response);
      
      // const user = response.data.user;
      set({ 
        user: response.data.user,
        token,
        loading: false
      });


    } catch (error) {
      // console.error("Token invalid or expired", error);
      console.error("Fetch user error:", error); // Add this

      localStorage.removeItem("token");
      // cachedToken = null;
      set({
        user: null,
        token: null,
        loading: false,
        error: error instanceof Error ? error.message : "Failed to fetch user"
      });
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    // cachedToken = null;
    set({ user: null, token: null, error: null, loading: false });
  },
}));
