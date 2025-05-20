import { create } from "zustand";

type SidebarStoreType = {
  open: boolean;
  toggleSidebar: () => void;
};

export const useSidebarStore = create<SidebarStoreType>((set) => ({
  open: false,
  toggleSidebar: () => set((state) => ({ open: !state.open })),
}));
