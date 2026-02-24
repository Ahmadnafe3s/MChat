import axios from "axios"

const botApi = {
    getBotMessages: async (authUserId: number): Promise<BotMessageResponse> => {
        const res = await axios.get(`https://meta.muzztech.com/api/v1/bot/list?value=${authUserId}`)
        return res.data
    },
    sendBotMessage: async (botId: number, selctedChatId: number) => {
        const res = await axios.post(`https://meta.muzztech.com/api/v1/send-bot/${botId}/${selctedChatId}`)
        return res.data
    }
}

export default botApi