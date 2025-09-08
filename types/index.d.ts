declare interface User {
    id: string
    image: string
    name: string
    email: string
}

declare interface AuthStore {
    user: User | null
    setUser: (user: User) => void
    logout: () => void
}