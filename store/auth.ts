import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useAuthStore = create<AuthStore>()(
    persist((set) => ({
        user: null,
        setUser: (user) => set({ user }),
        logout: () => set({ user: null }),
    }),
        {
            name: 'auth',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
)



// const SecureStoreStorage = {
//     getItem: async (key: string) => {
//         return await SecureStore.getItemAsync(key);
//     },
//     setItem: async (key: string, value: string) => {
//         await SecureStore.setItemAsync(key, value);
//     },
//     removeItem: async (key: string) => {
//         await SecureStore.deleteItemAsync(key);
//     },
// }