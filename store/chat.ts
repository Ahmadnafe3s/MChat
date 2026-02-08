import { create } from "zustand";

export const useChatStore = create<ChatStore>((set, get) => ({
    selectedChat: null,
    setSelectedChat: (chat: Chat | Contact) => set({ selectedChat: chat }),
    setStarred: (status: string) => {
        const { selectedChat } = get()
        if (selectedChat && 'is_starred' in selectedChat) {
            selectedChat.is_starred = status
            set({ selectedChat })
        }
    },
    setStatus: (status: string) => {
        const { selectedChat } = get()
        if (selectedChat) {
            selectedChat.status = status
            set({ selectedChat })
        }
    }
}))