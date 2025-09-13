declare interface User {
    id: number
    name: string
    email: string
    mobile: string
    company: string
    attribute: string
    role: string
    self_id: number
}

declare interface AuthStore {
    user: User | null
    setUser: (user: User) => void
    logout: () => void
}

declare interface Chat {
    id: number
    name: string
    phone: string
    formatted: string
    status: string
    unread_count: number,
    last_message: string
    last_chat: string
    is_starred: string
}

declare interface PaginatedChats {
    data: Chat[]
    current_page: number
    last_page: number
    total: number
}


declare interface ChatStore {
    selectedChat: Chat | null
    setSelectedChat: (chat: Chat) => void
}