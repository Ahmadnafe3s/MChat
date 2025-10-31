import { ClearChatApi } from '@/services/clearChat'
import { useChatStore } from '@/store/chat'
import { useToastStore } from '@/store/toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'

const useClearChat = () => {

    const queryClient = useQueryClient()
    const { selectedChat } = useChatStore()
    const { showToast } = useToastStore()

    const sendOTP = useMutation({
        mutationFn: (_: any) => ClearChatApi.sendOTP(selectedChat?.id!),
        onError: (err: AxiosError<{ message: string }>) => {
            const ERR = err.response?.data.message ?? 'Failed to send OTP'
            showToast(ERR, 'error')
        }
    })

    const verifyOTP = useMutation({
        mutationFn: (otp: number) => ClearChatApi.verifyOTP(selectedChat?.id!, { otp }),
        onSuccess: () => {
            queryClient.setQueryData(['conversations', selectedChat?.id], () => [])
        },
        onError: (err: AxiosError<{ message: string }>) => err.response?.data.message ?? 'Failed to Verify OTP'
    })

    return {
        sendOTP,
        verifyOTP
    }
}

export default useClearChat