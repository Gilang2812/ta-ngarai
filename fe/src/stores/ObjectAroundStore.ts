import { ObjectDataType } from "@/data/object";
import { create } from "zustand";

type ObjectAround = {
  object: ObjectDataType;
  checkObject: (name: keyof ObjectDataType, check: boolean) => void;
};
const useObjectAroundStore = create<ObjectAround>((set) => ({
  object: {
    attraction: true,
    culinary: true,
    souvenir: true,
    traditional: true,
    worship: true,
    homestay: true,
  },
  checkObject: (name, check) =>
    set((state) => ({ object: { ...state.object, [name]: check } })),
}));

export default useObjectAroundStore;
