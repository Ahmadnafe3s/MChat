import axios from "axios";

const TemplateApi = {
    getTemplates: async (params: { value: number }): Promise<TemplatesResponse> => {
        const res = await axios.get(`https://meta.muzztech.com/api/v1/template/list`, { params });
        return res.data;
    },
}

export default TemplateApi