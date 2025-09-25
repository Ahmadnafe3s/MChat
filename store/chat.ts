import { create } from "zustand";

export const useChatStore = create<ChatStore>((set, get) => ({
    selectedChat: null,
    setSelectedChat: (chat: Chat) => set({ selectedChat: chat }),
    setStarred: (status: string) => {
        const { selectedChat } = get()
        if (selectedChat) {
            selectedChat.is_starred = status
            set({ selectedChat })
        }
    },
}))