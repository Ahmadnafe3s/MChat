import axios from "axios"

export const contactApi = {
    async getContacts(params: { attribute: string, status: string, page: number, search: string, per_page: number, value: number }): Promise<paginatedContacts> {
        const res = await axios.get(`https://meta.muzztech.com/api/v1/contacts`, { params })
        return res.data
    },
}