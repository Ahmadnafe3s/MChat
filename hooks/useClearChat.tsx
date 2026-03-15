import { ClearChatApi } from '@/services/clearChat'
import { useChatStore } from '@/store/chat'
import { useToastStore } from '@/store/toast'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

const useClearChat = () => {
    const { selectedChat } = useChatStore()
    const { showToast } = useToastStore()
    return useMutation({
        mutationFn: (_: any) => ClearChatApi.clearChat(selectedChat?.id!),
        onSuccess: () => {
            showToast('Request submitted successfully', 'success')
        },
        onError: (err: AxiosError<any>) => {
            const ERR = err.response?.data?.message || err.message || 'Failed to clear chat'
            showToast(ERR, 'error')
        }
    })
}

export default useClearChat