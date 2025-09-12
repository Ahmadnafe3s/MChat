import axios from "axios"

const ChatApi = {
    getChats: async (params: { id: number, user_type: string, self_id: number | null, parent_id: number, status: string, page: number, per_page: number, serach?: string }): Promise<PaginatedChats> => {
        const res = await axios.get(`https://meta.muzztech.com/api/v1/chat/contacts`, { params })
        return res.data
    }
}


export default ChatApi
