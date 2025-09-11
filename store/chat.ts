import { create } from "zustand";

export const useChatStore = create<ChatStore>((set) => ({
    selectedChat: null,
    setSelectedChat: (chat: Chat) => set({ selectedChat: chat }),
}))