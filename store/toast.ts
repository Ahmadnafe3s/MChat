// toastStore.ts
import { create } from "zustand";

type ToastState = {
    message: string | null;
    showToast: (msg: string, duration?: number) => void;
    hideToast: () => void;
};

export const useToastStore = create<ToastState>((set) => ({
    message: null,
    showToast: (msg, duration = 2000) => {
        set({ message: msg });

        // Auto hide after duration
        setTimeout(() => {
            set({ message: null });
        }, duration);
    },
    hideToast: () => set({ message: null }),
}));
