import axios from "axios"

const authApi = async (email: string, password: string): Promise<User> => {
    const res = await axios.post(`https://meta.muzztech.com/api/v1/chat/login?email=${email}&password=${password}`)
    return res.data.data
}


export default authApi