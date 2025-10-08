import axios from "axios";

const TemplateApi = {
    getTemplates: async (params: { value: number }): Promise<TemplatesResponse> => {
        const res = await axios.get(`https://meta.muzztech.com/api/v1/template/list`, { params });
        return res.data;
    },
    sendTemplate: async (templateId: number, selectedChatId: number, data: any) => {
        const res = await axios.post(`https://meta.muzztech.com/api/v1/send-template/${templateId}/${selectedChatId}`, data);
        return res.data
    }
}

export default TemplateApi