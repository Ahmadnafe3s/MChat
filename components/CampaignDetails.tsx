import useCampaign from '@/hooks/useCampaign'
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import React, { forwardRef, useMemo } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'

interface Props {
    onClose: () => void
    campaignId: number
}

interface CampaignData {
    id: number
    total: string
    pending_count: number
    submitted_count: number
    sent_count: number
    delivered_count: number
    read_count: number
    failed_count: number
    paused_count: number
}

const CampaignDetails = forwardRef<BottomSheetModal, Props>(({ onClose, campaignId }, ref) => {
    const points = useMemo(() => ["40%", "75%"], [])
    const { getCampaignByID } = useCampaign()

    const { data, isLoading, isError, error } = getCampaignByID(campaignId) as {
        data: CampaignData
        isLoading: boolean
        isError: boolean
        error: any
    }

    const renderBackdrop = React.useCallback((props: any) => (
        <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            opacity={0.5}
        />
    ), []);

    const stats = [
        { label: 'Total', value: data?.total || '0', color: 'bg-blue-500' },
        { label: 'Sent', value: data?.sent_count || 0, color: 'bg-purple-500' },
        { label: 'Delivered', value: data?.delivered_count || 0, color: 'bg-green-500' },
        { label: 'Read', value: data?.read_count || 0, color: 'bg-cyan-500' },
        { label: 'Failed', value: data?.failed_count || 0, color: 'bg-red-500' },
        { label: 'Pending', value: data?.pending_count || 0, color: 'bg-amber-500' },
    ]

    const calculateSuccessRate = () => {
        if (!data?.sent_count || data.sent_count === 0) return 0
        return ((data.delivered_count / data.sent_count) * 100).toFixed(1)
    }

    return (
        <BottomSheetModal
            ref={ref}
            snapPoints={points}
            onDismiss={onClose}
            backdropComponent={renderBackdrop}
            enablePanDownToClose
            handleIndicatorStyle={{ backgroundColor: '#D1D5DB', width: 40, height: 4 }}
            backgroundStyle={{ backgroundColor: '#FFFFFF', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
        >
            <BottomSheetScrollView className="flex-1 px-5">
                <View className="mb-6 pt-2">
                    <Text className="text-2xl font-bold text-gray-900 mb-1">Campaign Details</Text>
                </View>

                {isLoading && (
                    <View className="flex-1 justify-center items-center py-10">
                        <ActivityIndicator size="large" color="#3B82F6" />
                        <Text className="mt-3 text-sm text-gray-500">Loading campaign data...</Text>
                    </View>
                )}

                {isError && (
                    <View className="flex-1 justify-center items-center py-10">
                        <Text className="text-base font-semibold text-red-500 mb-2">Error loading campaign</Text>
                        <Text className="text-sm text-gray-500 text-center">{error?.message}</Text>
                    </View>
                )}

                {!isLoading && !isError && data && (
                    <>
                        <View className="flex-row flex-wrap -mx-1.5 mb-6">
                            {stats.map((stat, index) => (
                                <View key={index} className="w-1/3 px-1.5 mb-3 items-center">
                                    <View className={`w-1 h-1 rounded-sm mb-2 ${stat.color}`} />
                                    <Text className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</Text>
                                    <Text className="text-xs text-gray-500 font-medium">{stat.label}</Text>
                                </View>
                            ))}
                        </View>

                        <View className="bg-gray-50 rounded-xl p-4 mb-6">
                            <Text className="text-base font-semibold text-gray-900 mb-4">Summary</Text>
                            
                            <View className="flex-row justify-between items-center py-2.5">
                                <Text className="text-sm text-gray-500 font-medium">Submitted</Text>
                                <Text className="text-sm text-gray-900 font-semibold">{data.submitted_count}</Text>
                            </View>
                            
                            <View className="flex-row justify-between items-center py-2.5">
                                <Text className="text-sm text-gray-500 font-medium">Paused</Text>
                                <Text className="text-sm text-gray-900 font-semibold">{data.paused_count}</Text>
                            </View>

                            <View className="h-px bg-gray-200 my-2" />

                            <View className="flex-row justify-between items-center py-2.5">
                                <Text className="text-sm text-gray-900 font-semibold">Success Rate</Text>
                                <Text className="text-sm text-green-600 font-bold">
                                    {calculateSuccessRate()}%
                                </Text>
                            </View>
                        </View>
                    </>
                )}
            </BottomSheetScrollView>
        </BottomSheetModal>
    )
})

export default CampaignDetails