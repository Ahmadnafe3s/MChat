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
    }
}


export default ChatApi
