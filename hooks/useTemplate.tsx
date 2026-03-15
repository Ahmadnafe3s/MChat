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
            if (newData.success === false) {
                showToast(newData.message || "Something went wrong, please retry again", "error");
                return;
            }
            queryClient.setQueryData(["conversations", selectedChat?.id], (oldData: any) => {
                return [newData, ...(oldData || [])]
            })
        },
        onError: (error: AxiosError<{ message: string }>) => {
            console.log("Error sending template:", error.message);
            const err = error.response?.data.message || "Faield to send template";
            showToast(err, "error")
        }
    })

    type SendBulkTemplateParams = {
        templateId: number;
        contactIds: string;
        data: any;
    }

    const sendBulkTemplate = useMutation({
        mutationFn: ({ templateId, contactIds, data }: SendBulkTemplateParams) => TemplateApi.sendBulkTemplate(templateId, contactIds, data),
        onSuccess: (newData: any) => {
            if (newData.success === false) {
                showToast(newData.message || "Something went wrong, please retry again", "error");
                return;
            }
            queryClient.invalidateQueries({ queryKey: ["conversations"] })
        },
        onError: (error: AxiosError<{ message: string }>) => {
            console.log("Error sending template:", error.response?.data);
            const err = error.response?.data.message || "Faield to send template";
            showToast(err, "error")
        }
    })


    return {
        getTemplate,
        sendTemplate,
        sendBulkTemplate
    }
}

export default useTemplate