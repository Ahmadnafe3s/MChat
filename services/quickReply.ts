import axios from "axios"

const quickReplyApi = {
    getQuickReplies: async (params: { value: number }): Promise<QuickReply[]> => {
        const res = await axios.get(`https://meta.muzztech.com/api/v1/quick/reply/list`, { params })
        return res.data.data
    },

    createQuickReply: async (params: { value: number, name: string, content: string }) => {
        const res = await axios.post(`https://meta.muzztech.com//api/v1/create/quick/reply`, params)
        return res.data
    },
}




export default quickReplyApi