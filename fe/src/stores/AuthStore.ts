import { UserLogin } from "@/validation/authSchema";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStoreType = {
  user: UserLogin | null;
  setUser: (user: UserLogin) => void;
  updateUser: (user: Partial<UserLogin>) => void;
  clearUser: () => void;
};

export const useAuthStore = create<AuthStoreType>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
      updateUser: (user) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...user } : null,
        })),
    }),
    {
      name: "auth-storage",
    }
  )
);
