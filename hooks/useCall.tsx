import callApi from '@/services/call';
import { useAuthStore } from '@/store/auth';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

const useCall = () => {

  console.log('We are in useCall 📞');

  const { user } = useAuthStore();

  const getCallLogs = (startDate: string, endDate: string) => useQuery({
    queryKey: ['callLogs', user?.id, startDate, endDate],
    queryFn: () => callApi.getCallLogs({ value: user?.id!, attribute: user?.attribute!, from_date: startDate, end_date: endDate }),
    enabled: !!user?.id,
    placeholderData: keepPreviousData
  })

  return {
    getCallLogs
  }
}

export default useCall