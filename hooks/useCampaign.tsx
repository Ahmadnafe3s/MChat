import { CampaignApi } from '@/services/campaign'
import { useAuthStore } from '@/store/auth'
import { keepPreviousData, useInfiniteQuery, useQuery } from '@tanstack/react-query'

export const useCampaigns = (fromDate: string, endDate: string) => {
    const { user } = useAuthStore()

    return useInfiniteQuery({
        queryKey: ['campaigns', user?.id, fromDate, endDate],
        queryFn: ({ pageParam = 1 }) => CampaignApi.getCampaings({
            value: user?.id!,
            attribute: user?.attribute!,
            from_date: fromDate,
            end_date: endDate,
            page: pageParam,
            per_page: 20
        }),
        initialPageParam: 1,
        getNextPageParam: (prev_page: CampaignResponse) => {
            const { current_page, last_page } = prev_page
            return current_page < last_page ? current_page + 1 : undefined
        },
        enabled: !!user?.id
    })
}

export const useCampaignByID = (campaignId: number) => {
    return useQuery({
        queryKey: ['campaigns', campaignId],
        queryFn: () => CampaignApi.getCampaignDetails(campaignId),
        enabled: !!campaignId,
        placeholderData: keepPreviousData
    })
}