// stores/toastStore.ts
import { create } from "zustand";

type ToastState = {
    toast: { message: string; duration: number, type: "success" | "error" } | null;
    showToast: (message: string, type: "success" | "error", duration?: number) => void;
};

export const useToastStore = create<ToastState>((set) => ({
    toast: null,
    showToast: (message, type, duration = 2000) => {
        set({ toast: { message, type, duration } })
        setTimeout(() => set({ toast: null }), duration)
    }
}));
