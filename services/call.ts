import axios from "axios";

const callApi = {
    getCallLogs: async (params: { value: number, attribute: string, from_date: string, end_date: string }): Promise<CallLogs> => {
        const res = await axios.get(`https://meta.muzztech.com/api/v1/call-history`, { params });
        return res.data
    }
}









export default callApi