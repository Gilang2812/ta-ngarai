import { axiosInstance } from "@/lib/axios";
import { LoginResponse, UserLogin } from "@/validation/authSchema";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStoreType = {
  user: UserLogin | null;
  setUser: (user: UserLogin) => void;
  updateUser: (user: Partial<UserLogin>) => void;
  clearUser: () => void;
  fetchMe: () => void;
  lastPathName: string | null;
  setLastPathname: (pathname: string | null) => void;
};

export const useAuthStore = create<AuthStoreType>()(
  persist(
    (set) => ({
      user: null,
      lastPathName: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
      updateUser: (user) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...user } : null,
        })),
      fetchMe: async () => {
        const { data } = await axiosInstance.get<LoginResponse>("/auth/me");
        localStorage.setItem("token", data.token);
        set({ user: data.user });
        console.log("test");
      },
      setLastPathname: (pathname: string | null) =>
        set({ lastPathName: pathname }),
    }),
    {
      name: "auth-storage",
    }
  )
);
