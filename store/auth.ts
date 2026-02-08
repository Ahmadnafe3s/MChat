import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useAuthStore = create<AuthStore>()(
    persist((set) => ({
        user: null,
        setUser: (user) => set({ user }),
        logout: () => set({ user: null }),
        isHydrated: false,
        setHydrated: (status) => set({ isHydrated: status }),
    }),
        {
            name: 'auth',
            storage: createJSONStorage(() => AsyncStorage),
            onRehydrateStorage: (state) => {
                return (rehydratedState, error) => {
                    if (!error) {
                        rehydratedState?.setHydrated(true);
                    }
                };
            },
        }
    )
)
