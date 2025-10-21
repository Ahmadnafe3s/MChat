import axios from "axios";

export const CampaignApi = {
    getCampaings: async (
        params: {
            value: number,
            attribute: string,
            from_date: string,
            end_date: string
        }): Promise<CampaignResponse> => {
        const res = await axios.get(`https://meta.muzztech.com/api/v1/campaign-list`, { params });
        return res.data
    },

    getCampaignDetails: async (campaignId: number): Promise<CampaignDetails> => {
        const res = await axios.get(`https://meta.muzztech.com/api/v1/campaign-status/${campaignId}`);
        return res.data.data
    }
}