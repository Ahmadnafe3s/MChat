import callApi from '@/services/call';
import { useAuthStore } from '@/store/auth';
import { useToastStore } from '@/store/toast';
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
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

  return useQuery({
    queryKey: ['callLogs', user?.id, startDate, endDate, status],
    queryFn: () => callApi.getCallLogs({
      value: user?.id!,
      attribute: user?.attribute!,
      from_date: startDate,
      end_date: endDate,
      status
    }),
    enabled: !!user?.id,
    placeholderData: keepPreviousData
  })
}

export default useCall