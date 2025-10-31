import axios from "axios";

export const ClearChatApi = {
    sendOTP: async (selectedChat: number) => {
        const res = await axios.post(`https://meta.muzztech.com/api/v1/send-otp/${selectedChat}`);
        return res.data;
    },
    verifyOTP: async (selectedChat: number, params: { otp: number }) => {
        const res = await axios.post(`https://meta.muzztech.com/api/v1/verify-otp/${selectedChat}?otp=${params.otp}`);
        return res.data;
    },
}