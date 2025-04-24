import { create } from "zustand";

type ToggleType = "default" | "around" | "package";

type ToggleStore = {
  open: ToggleType;
  toggleOpen: (open: ToggleType) => void;
  
};

export const useToggleStore = create<ToggleStore>((set) => ({
  open: "default",
  toggleOpen: (open) => set({ open }),
}));
