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

    const parseNumber = (value: any) => {
        const num = parseInt(value, 10)
        return isNaN(num) ? 0 : num
    }

    const stats = React.useMemo(() => {
        if (!data) return []
        return [
            { label: 'Total', value: parseNumber(data.total), color: 'bg-blue-100 text-blue-700' },
            { label: 'Sent', value: parseNumber(data.sent_count), color: 'bg-purple-100 text-purple-700' },
            { label: 'Delivered', value: parseNumber(data.delivered_count), color: 'bg-emerald-100 text-emerald-700' },
            { label: 'Read', value: parseNumber(data.read_count), color: 'bg-sky-100 text-sky-700' },
            { label: 'Failed', value: parseNumber(data.failed_count), color: 'bg-red-100 text-red-700' },
            { label: 'Pending', value: parseNumber(data.pending_count), color: 'bg-amber-100 text-amber-700' },
            { label: 'Submitted', value: parseNumber(data.submitted_count), color: 'bg-gray-100 text-gray-700' },
            { label: 'Paused', value: parseNumber(data.paused_count), color: 'bg-indigo-100 text-indigo-700' },
        ]
    }, [data])

    const calculateSuccessRate = () => {
        if (!data?.sent_count) return '0.0'
        const sent = parseNumber(data.sent_count)
        const delivered = parseNumber(data.delivered_count)
        if (sent === 0) return '0.0'
        return ((delivered / sent) * 100).toFixed(1)
    }

    return (
        <BottomSheetModal
            ref={ref}
            snapPoints={points}
            onDismiss={onClose}
            backdropComponent={renderBackdrop}
            enablePanDownToClose
            handleIndicatorStyle={{ backgroundColor: '#D1D5DB', width: 40, height: 4 }}
            backgroundStyle={{ backgroundColor: '#FFFFFF', borderTopLeftRadius: 24, borderTopRightRadius: 24 }}
        >
            <BottomSheetScrollView className="flex-1 px-6">
                <View className="mb-6 pt-2 items-center">
                    <Text className="text-2xl font-bold text-gray-900 mb-1">Campaign Overview</Text>
                    {data && (
                        <Text className="text-sm text-gray-500">ID: {campaignId}</Text>
                    )}
                </View>

                {isLoading && (
                    <View className="flex-1 justify-center items-center py-10">
                        <ActivityIndicator size="large" color="#10b981" />
                        <Text className="mt-3 text-sm text-gray-500">Fetching results...</Text>
                    </View>
                )}

                {isError && (
                    <View className="flex-1 justify-center items-center py-10">
                        <Text className="text-base font-semibold text-red-500 mb-2">Unavailable</Text>
                        <Text className="text-sm text-gray-500 text-center px-4">{error?.message || 'Could not load campaign data'}</Text>
                    </View>
                )}

                {!isLoading && !isError && data && (
                    <>
                        {/* Success Rate Card */}
                        <View className="bg-emerald-50 rounded-2xl p-5 mb-6 border border-emerald-100 flex-row justify-between items-center">
                            <View>
                                <Text className="text-emerald-800 font-semibold mb-1">Success Rate</Text>
                                <Text className="text-3xl font-bold text-emerald-600">{calculateSuccessRate()}%</Text>
                            </View>
                            <View className="h-12 w-12 rounded-full bg-emerald-100 items-center justify-center border border-emerald-200">
                                <Text className="text-xl">📈</Text>
                            </View>
                        </View>

                        <Text className="text-lg font-bold text-gray-900 mb-4">Statistics</Text>

                        <View className="flex-row flex-wrap -mx-2 mb-8">
                            {stats.map((stat, index) => (
                                <View key={index} className="w-1/2 px-2 mb-4">
                                    <View className={`rounded-2xl p-4 ${stat.color.split(' ')[0]}`}>
                                        <Text className={`text-2xl font-bold mb-1 ${stat.color.split(' ')[1]}`}>{stat.value}</Text>
                                        <Text className="text-xs font-semibold uppercase opacity-70 tracking-wider text-gray-600">{stat.label}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </>
                )}
            </BottomSheetScrollView>
        </BottomSheetModal>
    )
})

export default CampaignDetails