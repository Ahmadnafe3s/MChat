import botApi from "@/services/bot"
import { useAuthStore } from "@/store/auth"
import { useChatStore } from "@/store/chat"
import { useToastStore } from "@/store/toast"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"

const useBot = () => {

    const { user } = useAuthStore()
    const { selectedChat } = useChatStore()
    const { showToast } = useToastStore()
    const queryClient = useQueryClient()

    const getBotMessage = () => {
        return useQuery({
            queryKey: ["bot-message", user?.id],
            queryFn: () => botApi.getBotMessages(user?.id!),
            enabled: !!user?.id
        })
    }

    const sendBotMessage = useMutation({
        mutationFn: ({ botId, selctedChatId }: { botId: number, selctedChatId: number }) => botApi.sendBotMessage(botId, selctedChatId),
        onSuccess: (newData: any) => {

            if (newData.success === false) {
                showToast(newData.message || "Something went wrong, please retry again", "error");
                return;
            }
            queryClient.setQueryData(["conversations", selectedChat?.id], (oldData: any) => {
                return [newData.data, ...(oldData || [])]
            })
        },
        onError: (error: AxiosError<{ message: string }>) => {
            console.log("Error sending template:", error.message);
            const err = error.response?.data.message || "Faield to send template";
            showToast(err, "error")
        }

    })

    return {
        getBotMessage,
        sendBotMessage
    }
}

export default useBot