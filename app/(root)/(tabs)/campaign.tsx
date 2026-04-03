import CampaignDetails from '@/components/CampaignDetails'
import DateFilter, { DateFilterRef, genDate } from '@/components/DateFilter'
import { useCampaigns } from '@/hooks/useCampaign'
import { Ionicons } from '@expo/vector-icons'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useFocusEffect } from '@react-navigation/native'
import { FlashList } from '@shopify/flash-list'
import { useRouter } from 'expo-router'
import React, { useCallback, useRef } from 'react'
import { ActivityIndicator, BackHandler, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


const Campaign = () => {
    const router = useRouter()
    const [startDate, setStartDate] = React.useState(genDate(new Date()))
    const [endDate, setEndDate] = React.useState(genDate(new Date()))
    const dateFilterRef = useRef<DateFilterRef>(null)
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } = useCampaigns(startDate, endDate)
    const bottomSheetRef = useRef<BottomSheetModal>(null)
    const [selectedCampaign, setSelectedCampaign] = React.useState<number | null>(null)

    const campaignsData = data?.pages.flatMap((page) => page?.data ?? []) ?? [];

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                if (selectedCampaign) {
                    bottomSheetRef.current?.dismiss()
                    return true
                }
                return false
            }

            const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress)

            return () =>
                subscription.remove()
        }, [selectedCampaign])
    )

    const handleDateChange = useCallback((start: string, end: string) => {
        setStartDate(start)
        setEndDate(end)
    }, [])

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'completed':
                return { bg: 'bg-emerald-100', text: 'text-emerald-700', icon: 'checkmark-circle' }
            case 'pending':
                return { bg: 'bg-amber-100', text: 'text-amber-700', icon: 'time' }
            case 'submitted':
                return { bg: 'bg-blue-100', text: 'text-blue-700', icon: 'document-text' }
            case 'failed':
                return { bg: 'bg-red-100', text: 'text-red-700', icon: 'close-circle' }
            case 'paused':
                return { bg: 'bg-gray-100', text: 'text-gray-700', icon: 'pause-circle' }
            default:
                return { bg: 'bg-blue-100', text: 'text-blue-700', icon: 'information-circle' }
        }
    }

    const renderCampaignItem = ({ item }: { item: Campaign }) => {
        const statusStyle = getStatusColor(item.status)

        return (
            <TouchableOpacity
                className="bg-white mx-4 mb-3 rounded-2xl border border-gray-100 shadow-sm"
                activeOpacity={0.7}
            >
                <View className="p-4">
                    {/* Header Row */}
                    <View className="flex-row items-start justify-between mb-3">
                        <View className="flex-1">
                            <Text className="text-base font-bold text-gray-900 mb-1">
                                {item.template}
                            </Text>
                            <Text className="text-xs text-gray-500">
                                Job ID: {item.job_id}
                            </Text>
                        </View>
                        <View className={`px-3 py-1.5 rounded-full ${statusStyle.bg}`}>
                            <View className="flex-row items-center">
                                <Ionicons name={statusStyle.icon as any} size={14} color={statusStyle.text.includes('emerald') ? '#047857' : statusStyle.text.includes('amber') ? '#b45309' : statusStyle.text.includes('red') ? '#b91c1c' : '#374151'} />
                                <Text className={`text-xs font-semibold ml-1 ${statusStyle.text}`}>
                                    {item.status}
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* Stats Grid */}
                    <View className="flex-row flex-wrap mb-3">
                        <View className="bg-emerald-50 rounded-xl px-3 py-2 mr-2 mb-2">
                            <Text className="text-xs text-gray-600 mb-0.5">Total</Text>
                            <Text className="text-sm font-bold text-emerald-700">{item.total}</Text>
                        </View>
                        <View className="bg-purple-50 rounded-xl px-3 py-2 mr-2 mb-2">
                            <Text className="text-xs text-gray-600 mb-0.5">Deducted</Text>
                            <Text className="text-sm font-bold text-purple-700">{item.deducted}</Text>
                        </View>
                        <View className="bg-blue-50 rounded-xl px-3 py-2 mb-2">
                            <Text className="text-xs text-gray-600 mb-0.5">Method</Text>
                            <Text className="text-sm font-bold text-blue-700">{item.through}</Text>
                        </View>
                    </View>

                    {/* Footer Row */}
                    <View className="flex-row items-center justify-between pt-3 border-t border-gray-100">
                        <View className="flex-row items-center">
                            <Ionicons name="calendar-outline" size={14} color="#6b7280" />
                            <Text className="text-xs text-gray-600 ml-1.5">
                                {item.formatted_date}
                            </Text>
                        </View>
                        <TouchableOpacity className="flex-row items-center" onPress={() => {
                            setSelectedCampaign(item.id)
                            bottomSheetRef.current?.present()
                        }}>
                            <Text className="text-xs font-semibold text-emerald-600 mr-1">
                                View Details
                            </Text>
                            <Ionicons name="chevron-forward" size={14} color="#059669" />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    const renderHeader = () => {
        const statuses = data?.pages[0]?.statuses
        const lastPage = data?.pages[data.pages.length - 1]
        const total = lastPage?.total || 0
        const to = lastPage?.to || 0

        if (!statuses) return <View className="p-4"><Text className="text-lg font-bold text-gray-900">Campaign Results</Text></View>

        const statsData = [
            { label: 'Total', value: statuses.total, color: 'text-amber-500', bgColor: 'bg-amber-50', borderColor: 'border-amber-200', icon: '#f59e0b', iconName: 'list' },
            { label: 'Pending', value: statuses.pending_count, color: 'text-orange-500', bgColor: 'bg-orange-50', borderColor: 'border-orange-200', icon: '#f97316', iconName: 'time' },
            { label: 'Submitted', value: statuses.submitted_count, color: 'text-gray-500', bgColor: 'bg-gray-50', borderColor: 'border-gray-200', icon: '#6b7280', iconName: 'document-text' },
            { label: 'Sent', value: statuses.sent_count, color: 'text-purple-500', bgColor: 'bg-purple-50', borderColor: 'border-purple-200', icon: '#a855f7', iconName: 'paper-plane' },
            { label: 'Delivered', value: statuses.delivered_count, color: 'text-emerald-500', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200', icon: '#10b981', iconName: 'checkmark-circle' },
            { label: 'Read', value: statuses.read_count, color: 'text-blue-500', bgColor: 'bg-blue-50', borderColor: 'border-blue-200', icon: '#3b82f6', iconName: 'eye' },
            { label: 'Failed', value: statuses.failed_count, color: 'text-red-500', bgColor: 'bg-red-50', borderColor: 'border-red-200', icon: '#ef4444', iconName: 'close-circle' },
            { label: 'Paused', value: statuses.paused_count, color: 'text-indigo-500', bgColor: 'bg-indigo-50', borderColor: 'border-indigo-200', icon: '#6366f1', iconName: 'pause-circle' },
        ]

        return (
            <View className="py-4">
                <View className="flex-row items-center justify-between mb-4 px-4">
                    <Text className="text-lg font-bold text-gray-900">
                        Campaign Results
                    </Text>
                    <Text className="text-sm text-gray-600">
                        {to} of {total} campaigns
                    </Text>
                </View>

                {/* Status Summary ScrollView */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 16 }}
                    className="flex-row"
                >
                    {statsData.map((item, index) => (
                        <View
                            key={index}
                            className={`mr-3 ${item.bgColor} flex-row items-center rounded-2xl px-4 py-3 border ${item.borderColor} shadow-sm min-w-36`}
                        >
                            {/* Icon Container */}
                            <View
                                className="w-10 h-10 rounded-xl bg-white items-center justify-center mr-3 shadow-sm"
                            >
                                <Ionicons
                                    name={item.iconName as any}
                                    size={20}
                                    color={item.icon}
                                />
                            </View>

                            {/* Stats Content */}
                            <View className="flex-1">
                                <Text className={`text-xl font-bold ${item.color} leading-none`}>
                                    {item.value}
                                </Text>
                                <Text className="text-gray-500 text-[10px] font-medium uppercase tracking-wider mt-1">
                                    {item.label}
                                </Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>
        )
    }

    const renderEmpty = () => (
        <View className="flex-1 items-center justify-center py-20">
            <Ionicons name="folder-open-outline" size={64} color="#d1d5db" />
            <Text className="text-lg font-semibold text-gray-900 mt-4 mb-2">
                No Campaigns Found
            </Text>
            <Text className="text-sm text-gray-600 text-center px-8">
                Try adjusting your date range to see more campaigns
            </Text>
        </View>
    )

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Header with back button */}
            <View className="bg-white px-4 py-4 border-b border-gray-200">
                <View className="flex-row items-center">
                    <TouchableOpacity
                        onPress={() => {
                            if (selectedCampaign) {
                                bottomSheetRef.current?.dismiss()
                            } else {
                                router.back()
                            }
                        }}
                        className="w-10 h-10 items-center justify-center rounded-full bg-emerald-50"
                        activeOpacity={0.7}
                    >
                        <Ionicons name="arrow-back" size={24} color="#059669" />
                    </TouchableOpacity>
                    <Text className="text-2xl font-bold text-gray-900 ml-3">
                        Campaigns
                    </Text>
                </View>
            </View>

            {/* Date Filter */}
            <DateFilter
                ref={dateFilterRef}
                variant="amber"
                onDateChange={handleDateChange}
            />

            {/* Campaign List */}
            {isLoading ? (
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator size="large" color="#059669" />
                    <Text className="text-gray-600 mt-4">Loading campaigns...</Text>
                </View>
            ) : isError ? (
                <View className="flex-1 items-center justify-center px-8">
                    <Ionicons name="alert-circle-outline" size={64} color="#ef4444" />
                    <Text className="text-lg font-semibold text-gray-900 mt-4 mb-2">
                        Error Loading Campaigns
                    </Text>
                    <Text className="text-sm text-gray-600 text-center">
                        {error?.message || 'Something went wrong'}
                    </Text>
                </View>
            ) : (
                <FlashList
                    data={campaignsData}
                    renderItem={renderCampaignItem}
                    estimatedItemSize={200}
                    ListHeaderComponent={renderHeader}
                    ListEmptyComponent={renderEmpty}
                    onScroll={(e) => dateFilterRef.current?.handleScroll(e)}
                    scrollEventThrottle={16}
                    onEndReached={() => {
                        if (hasNextPage && !isFetchingNextPage) {
                            fetchNextPage()
                        }
                    }}
                    onEndReachedThreshold={1}
                    ListFooterComponent={isFetchingNextPage ? <ActivityIndicator size="small" color="#059669" className="py-4" /> : null}
                    contentContainerStyle={{ paddingTop: 8, paddingBottom: 40 }}
                    showsVerticalScrollIndicator={false}
                />
            )}

            {/* Bottom Tab */}
            <CampaignDetails
                ref={bottomSheetRef}
                campaignId={selectedCampaign!}
                onClose={() => setSelectedCampaign(null)}
            />

        </SafeAreaView>
    )
}

export default Campaign