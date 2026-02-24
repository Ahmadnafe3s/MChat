import callApi from '@/services/call';
import { useAuthStore } from '@/store/auth';
import { useToastStore } from '@/store/toast';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const useCall = () => {

  console.log('We are in useCall 📞');

  const { user } = useAuthStore();
  const { showToast } = useToastStore();

  const initiateCall = useMutation({
    mutationFn: (selectedChat: number) => callApi.initiateCall(user?.id!, selectedChat),
    onSuccess: (newData) => {
      showToast("Call Initiated Successfully", "success")
    },
    onError: (err: AxiosError<any>) => {
      console.log(err.response?.data)
      const ERR = err.response?.data.message ?? 'Failed to initiate call'
      showToast(ERR, "error")
    }
  })

  return {
    initiateCall
  }
}


export const useCallLogs = (startDate: string, endDate: string, status: string) => {
  const { user } = useAuthStore();

  return useInfiniteQuery({
    queryKey: ['callLogs', user?.id, startDate, endDate, status],
    queryFn: ({ pageParam = 1 }) => callApi.getCallLogs({
      value: user?.id!,
      attribute: user?.attribute!,
      from_date: startDate,
      end_date: endDate,
      status,
      page: pageParam,
      per_page: 20
    }),
    initialPageParam: 1,
    getNextPageParam: (prev_page: CallLogs) => {
      return prev_page.current_page < prev_page.last_page ? prev_page.current_page + 1 : undefined
    },
    enabled: !!user?.id,
  })
}



export default useCall