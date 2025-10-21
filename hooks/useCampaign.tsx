import { CampaignApi } from '@/services/campaign'
import { useAuthStore } from '@/store/auth'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

const useCampaign = () => {
    const { user } = useAuthStore()

    const getCampaigns = (fromDate: string, endDate: string) => {
        return useQuery({
            queryKey: ['campaigns', user?.id, fromDate, endDate],
            queryFn: () => CampaignApi.getCampaings({ value: user?.id!, attribute: user?.attribute!, from_date: fromDate, end_date: endDate }),
            enabled: !!user?.id,
            placeholderData: keepPreviousData
        })
    }


    const getCampaignByID = (campaignId: number) => {
        return useQuery({
            queryKey: ['campaigns', campaignId],
            queryFn: () => CampaignApi.getCampaignDetails(campaignId),
            enabled: !!campaignId,
            placeholderData: keepPreviousData
        })
    }

    return {
        getCampaigns,
        getCampaignByID
    }
}

export default useCampaign