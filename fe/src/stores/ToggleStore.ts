import { create } from "zustand";

type ToggleStore = {
  open: boolean;
  toggleOpen: () => void;
};

export const useToggleStore = create<ToggleStore>((set) => ({
  open: false,
  toggleOpen: () => set((state) => ({ open: !state.open })),
}));
 