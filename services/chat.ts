import axios from "axios";

const ChatApi = {

  getChats: async (params: {
    value: number;
    attribute: string;
    status: string;
    page: number;
    per_page: number;
    search?: string;
  }): Promise<PaginatedChats> => {
    const res = await axios.get(
      `https://meta.muzztech.com/api/v1/chat/list`,
      { params }
    );

    return res.data;
  },

  getConversations: async (selectedChat: number): Promise<Conversations[]> => {
    const res = await axios.get(
      `https://meta.muzztech.com/api/v1/chat/history/${selectedChat}`
    );
    return res.data.data;
  },
  sendMessage: async ({
    receiverId,
    data,
  }: {
    receiverId: number;
    data: any;
  }): Promise<Conversations> => {
    const res = await axios.post(
      `https://meta.muzztech.com/api/v1/send/message/${receiverId}`,
      data,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return res.data.data;
  },
  setStarred: async (selectedChat: number): Promise<{ status: string }> => {
    const res = await axios.post(
      `https://meta.muzztech.com/api/v1/starred/contact/${selectedChat}`
    );
    return res.data;
  },
  blockChat: async (selectedChat: number): Promise<{ status: string }> => {
    const res = await axios.post(
      `https://meta.muzztech.com/api/v1/block-unblock/${selectedChat}`
    );
    return res.data;
  },
  getMedia: async (selectedChat: number): Promise<ChatMediaResponse> => {
    const res = await axios.get(`https://meta.muzztech.com/api/v1/chat-media/${selectedChat}`);
    return res.data
  },

  sendOTP: async (selectedChat: number) => {
    const res = await axios.post(`https://meta.muzztech.com/api/v1/send-otp/${selectedChat}`);
    return res.data;
  },
  verifyOTP: async (selectedChat: number, params: { otp: number }) => {
    const res = await axios.post(`https://meta.muzztech.com/api/v1/verify-otp/${selectedChat}`, { params });
    return res.data;
  }
};

export default ChatApi;
