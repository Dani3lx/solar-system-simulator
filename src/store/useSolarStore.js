import { create } from "zustand";

export const useSolarStore = create((set) => ({
    activeObject: null,
    setActiveObject: (targetRef) => set({ activeObject: targetRef }),
    clearActiveObject: () => set({ activeObject: null }),
}));
