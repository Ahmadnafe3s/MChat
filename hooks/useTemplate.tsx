import TemplateApi from '@/services/template'
import { useAuthStore } from '@/store/auth'
import { useChatStore } from '@/store/chat'
import { useToastStore } from '@/store/toast'
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'

const useTemplate = () => {

    const { user } = useAuthStore()
    const { selectedChat } = useChatStore()
    const { showToast } = useToastStore()
    const queryClient = useQueryClient();

    const getTemplate = useQuery({
        queryKey: ["template", user?.id],
        queryFn: () => TemplateApi.getTemplates({ value: user?.id! }),
        enabled: !!user?.id,
        refetchOnWindowFocus: true,
        placeholderData: keepPreviousData
    })


    const sendTemplate = useMutation({
        mutationFn: ({ templateId, data }: { templateId: number, data: any }) => TemplateApi.sendTemplate(templateId, selectedChat?.id!, data),
        onSuccess: (newData: any) => {
            console.log("Template API response:", JSON.stringify(newData, null, 2));
            if (newData.success === false) {
                showToast(newData.message || "Something went wrong, please retry again", "error");
                return;
            }
            queryClient.setQueryData(["conversations", selectedChat?.id], (oldData: any) => {
                return [newData, ...oldData]
            })
        },
        onError: (error: AxiosError<{ message: string }>) => {
            console.log("Error sending template:", error);
            const err = error.response?.data.message || "Faield to send template";
            showToast(err, "error")
        }
    })


    return {
        getTemplate,
        sendTemplate
    }
}

export default useTemplate