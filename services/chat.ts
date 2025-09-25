import axios from "axios"

const ChatApi = {
    getChats: async (params: {
        value: number,
        attribute: string,
        status: string,
        page: number,
        per_page: number,
        search?: string
    }): Promise<PaginatedChats> => {
        const res = await axios.get(`https://meta.muzztech.com/api/v1/chat/contacts`, { params })
        return res.data
    },
    getConversations: async (selectedChat: number): Promise<Conversations[]> => {
        const res = await axios.get(`https://meta.muzztech.com/api/v1/chat/history/${selectedChat}`)
        return res.data.data
    },
    sendMessage: async ({ receiverId, data }: { receiverId: number, data: any }): Promise<Conversations> => {
        const res = await axios.post(`https://meta.muzztech.com/api/v1/send/message/${receiverId}`, data, { headers: { 'Content-Type': 'multipart/form-data' } })
        return res.data.data
    },
    setStarred: async (selectedChat: number): Promise<{ status: string }> => {
        const res = await axios.post(`https://meta.muzztech.com/api/v1/starred/contact/${selectedChat}`)
        return res.data
    }
}


export default ChatApi
