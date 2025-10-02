import axios from "axios";

const contactProfileApi = {
    chatProfile: async (selectedChat: number): Promise<ChatProfile> => {
        const res = await axios.get(
            `https://meta.muzztech.com/api/v1/profile/${selectedChat}`
        );
        return res.data.data;
    },
    agentList: async (params: { value: number }): Promise<AgentList[]> => {
        const res = await axios.get(`https://meta.muzztech.com/api/v1/agent/list`, {
            params,
        });
        return res.data.data
    },
    submitAs: async (selectedChat: number, params: { submit_as: string }) => {
        const res = await axios.post(`https://meta.muzztech.com/api/v1/submit-as/${selectedChat}`, params);
        return res.data
    },
    assignAgent: async (selectedChat: number, params: { agent_id: number }) => {
        const res = await axios.post(`https://meta.muzztech.com/api/v1/assign-agent/${selectedChat}`, params);
        return res.data
    },
}



export default contactProfileApi