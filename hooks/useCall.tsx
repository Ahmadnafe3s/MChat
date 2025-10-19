import callApi from '@/services/call';
import { useAuthStore } from '@/store/auth';
import { useToastStore } from '@/store/toast';
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';

const useCall = () => {

  console.log('We are in useCall 📞');

  const { user } = useAuthStore();
  const { showToast } = useToastStore();

  const getCallLogs = (startDate: string, endDate: string) => {
    console.log("Calling getCallLogs 🚀");
    console.log(startDate, endDate)
    return useQuery({
      queryKey: ['callLogs', user?.id, startDate, endDate],
      queryFn: () => callApi.getCallLogs({ value: user?.id!, attribute: user?.attribute!, from_date: startDate, end_date: endDate }),
      enabled: !!user?.id,
      placeholderData: keepPreviousData
    })
  }


  const initiateCall = useMutation({
    mutationFn: (selectedChat: number) => callApi.initiateCall(user?.id!, selectedChat),
    onSuccess: (newData) => {
      showToast("Call Initiated Successfully", "success")
    },
    onError: () => {
      showToast("Failed to initiate call", "error")
    }
  })

  return {
    getCallLogs,
    initiateCall
  }
}

export default useCall