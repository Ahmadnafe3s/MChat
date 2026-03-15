import axios from "axios";

export const ClearChatApi = {
    clearChat: async (selectedChat: number) => {
        const res = await axios.post(`https://meta.muzztech.com/api/v1/clear-chat/${selectedChat}`);
        return res.data;
    },
}