import { create } from "zustand";

type ToggleType = "default" | "around" | "package" | "marketplace";

type ToggleStore = {
  open: ToggleType;
  toggleOpen: (open: ToggleType) => void;
  object_id: string | null;
  setObjectId: (id: string | null) => void;
};

export const useToggleStore = create<ToggleStore>((set) => ({
  open: "default",
  toggleOpen: (open) => set({ open }),
  object_id: null,
  setObjectId: (id) => set({ object_id: id }),
}));
