import quickReplyApi from '@/services/quickReply';
import { useAuthStore } from '@/store/auth';
import { useToastStore } from '@/store/toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const useQuickReply = ({ afterSuccess }: { afterSuccess?: () => void }) => {
    const { user } = useAuthStore();
    const queryClient = useQueryClient();
    const { showToast } = useToastStore();

    const quickReplies = useQuery({
        queryKey: ['quickReplies', user?.id],
        queryFn: () => quickReplyApi.getQuickReplies({ value: user?.id! }),
        initialData: [],
        enabled: !!user?.id,
    })


    const createQuickReply = useMutation({
        mutationFn: ({ name, content }: { name: string, content: string }) => quickReplyApi.createQuickReply({ value: user?.id!, name, content }),
        onSuccess: (data: QuickReply) => {
            queryClient.setQueryData(['quickReplies', user?.id!], (oldData: QuickReply[]) => {
                return [data, ...oldData]
            })
            afterSuccess?.()
        },
        onError: () => {
            showToast("Failed to create quick reply", "error")
        }
    })




    return {
        quickReplies,
        createQuickReply
    }
}

export default useQuickReply