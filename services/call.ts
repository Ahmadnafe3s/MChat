import axios from "axios";

const callApi = {
    getCallLogs: async (params: { value: number, attribute: string, from_date: string, end_date: string }): Promise<CallLogs> => {
        const res = await axios.get(`https://meta.muzztech.com/api/v1/call-history`, { params });
        return res.data
    },
    initiateCall: async (userId: number, selectedChatId: number) => {
        const res = await axios.post(`https://meta.muzztech.com/api/v1/click-to-call/${userId}/${selectedChatId}`);
        return res.data
    },
}









export default callApi