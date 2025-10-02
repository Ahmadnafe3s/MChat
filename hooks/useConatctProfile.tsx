import contactProfileApi from "@/services/contactProfile";
import { useAuthStore } from "@/store/auth";
import { useChatStore } from "@/store/chat";
import { useToastStore } from "@/store/toast";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useContactProfile = () => {
  const { selectedChat } = useChatStore();
  const { user } = useAuthStore()
  const { showToast } = useToastStore()

  const queryClient = useQueryClient();

  const chatProfile = useQuery({
    queryKey: ["chatProfile", selectedChat?.id],
    queryFn: () => contactProfileApi.chatProfile(selectedChat?.id!),
    placeholderData: keepPreviousData,
    enabled: !!selectedChat?.id,
  });

  const agentList = useQuery({
    queryKey: ["agentList", user?.id],
    queryFn: () => contactProfileApi.agentList({ value: user?.id! }),
    placeholderData: keepPreviousData,
    enabled: !!user?.id,
  });

  const submitAs = useMutation({
    mutationFn: (params: { submit_as: string }) => contactProfileApi.submitAs(selectedChat?.id!, params),
    onSuccess: (newData: any) => {
      queryClient.setQueryData(["chatProfile", selectedChat?.id], (oldData: ChatProfile) => {
        return { ...oldData, submit_as: newData?.submit_as }
      });
    },
    onError: () => {
      showToast("Operation failed", "error")
    }
  })

  const assignAgent = useMutation({
    mutationFn: (params: { agent_id: number }) => contactProfileApi.assignAgent(selectedChat?.id!, params),
    onSuccess: async (newData: any) => {
      await queryClient.setQueryData(["chatProfile", selectedChat?.id], (oldData: ChatProfile) => {
        return { ...oldData, assign_to: newData?.id }
      });
      await queryClient.setQueryData(["conversations", selectedChat?.id], (oldData: any) => {
        return [newData.data, ...oldData]
      })
    },
    onError: (err: AxiosError<{ message: string }>) => {
      const message = err.response?.data.message! || "Something went wrong";
      showToast(message, "error")
    }
  })

  return {
    chatProfile,
    agentList,
    submitAs,
    assignAgent
  };
};

export default useContactProfile;
