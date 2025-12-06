import { ChangeEvent } from "react";
import { create } from "zustand";

interface CursorPositionState {
  lat: number | null;
  lng: number | null;
  showCompass: boolean;
  toggleCompass: (e: ChangeEvent<HTMLInputElement>) => void;
  toggleCursorPosition: (e: ChangeEvent<HTMLInputElement>) => void;
  showCursorPosition: boolean;
  setCursorPos: ({
    lat,
    lng,
  }: {
    lat: number | null;
    lng: number | null;
  }) => void;
}

export const useAttachmentStore = create<CursorPositionState>((set) => ({
  lat: null,
  lng: null,
  showLegend: true,
  showCursorPosition: true,
  showCompass: true,
  toggleCompass: (e) => set({ showCompass: e.target.checked }),
  toggleCursorPosition: (e) => set({ showCursorPosition: e.target.checked }),
  setCursorPos: ({ lat, lng }) => set({ lat, lng }),
}));
