import CampaignDetails from '@/components/CampaignDetails'
import { useCampaigns } from '@/hooks/useCampaign'
import { Ionicons } from '@expo/vector-icons'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import DateTimePicker from '@react-native-community/datetimepicker'
import { FlashList } from '@shopify/flash-list'
import { useRouter } from 'expo-router'
import React, { useRef } from 'react'
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'

const FilterHeaderHeight = 120
const genDate = (date: Date) => date.toISOString().split('T')[0]



const Campaign = () => {
    const filterHeight = useSharedValue(FilterHeaderHeight)
    const router = useRouter()
    const [startDate, setStartDate] = React.useState(new Date());
    const [endDate, setEndDate] = React.useState(new Date())
    const [showStartPicker, setShowStartPicker] = React.useState(false)
    const [showEndPicker, setShowEndPicker] = React.useState(false)
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } = useCampaigns(genDate(startDate), genDate(endDate))
    const bottomSheetRef = useRef<BottomSheetModal>(null)
    const [selectedCampaign, setSelectedCampaign] = React.useState<number | null>(null)

    const campaignsData = data?.pages.flatMap((page) => page?.data ?? []) ?? [];

    console.log(data?.pages)

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        })
    }

    const handleStartDateChange = (event: any, selectedDate?: Date) => {
        setShowStartPicker(false)
        if (event.type === 'set' && selectedDate) {
            setStartDate(selectedDate)
        }
    }

    const handleEndDateChange = (event: any, selectedDate?: Date) => {
        setShowEndPicker(false)
        if (event.type === 'set' && selectedDate) {
            setEndDate(selectedDate)
        }
    }

    const animatedStyle = useAnimatedStyle(() => ({
        height: filterHeight.value,
    }), [])

    const handleScroll = (event: any) => {
        const offsetY = event.nativeEvent.contentOffset.y
        const newHeight = Math.max(FilterHeaderHeight - offsetY, 0)
        filterHeight.value = withTiming(newHeight, { duration: 100 })
    }

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'completed':
                return { bg: 'bg-emerald-100', text: 'text-emerald-700', icon: 'checkmark-circle' }
            case 'pending':
                return { bg: 'bg-amber-100', text: 'text-amber-700', icon: 'time' }
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
        if (!statuses) return <View className="p-4"><Text className="text-lg font-bold text-gray-900">Campaign Results</Text></View>

        const statsData = [
            { label: 'Total', value: statuses.total, color: 'text-amber-500', bgColor: 'bg-amber-50', borderColor: 'border-amber-200', icon: '#f59e0b', iconName: 'list' },
            { label: 'Delivered', value: statuses.delivered_count, color: 'text-emerald-500', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200', icon: '#10b981', iconName: 'checkmark-circle' },
            { label: 'Read', value: statuses.read_count, color: 'text-blue-500', bgColor: 'bg-blue-50', borderColor: 'border-blue-200', icon: '#3b82f6', iconName: 'eye' },
            { label: 'Failed', value: statuses.failed_count, color: 'text-red-500', bgColor: 'bg-red-50', borderColor: 'border-red-200', icon: '#ef4444', iconName: 'close-circle' },
            { label: 'Sent', value: statuses.sent_count, color: 'text-purple-500', bgColor: 'bg-purple-50', borderColor: 'border-purple-200', icon: '#a855f7', iconName: 'paper-plane' },
        ]

        return (
            <View className="py-4">
                <View className="flex-row items-center justify-between mb-4 px-4">
                    <Text className="text-lg font-bold text-gray-900">
                        Campaign Results
                    </Text>
                    <Text className="text-sm text-gray-600">
                        {campaignsData?.length || 0} campaigns
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
                            className={`mr-3 ${item.bgColor} flex-row items-center rounded-2xl px-4 py-3 border ${item.borderColor} shadow-sm w-36`}
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
                        onPress={() => router.back()}
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

            {/* Date Filter Section */}
            <Animated.View style={[animatedStyle, { overflow: 'hidden' }]}>
                <View className="bg-amber-50 px-4 py-4 border-b border-amber-100">
                    <Text className="text-sm font-semibold text-gray-700 mb-3">Filter by Date</Text>
                    <View className="flex-row items-center justify-between">
                        <TouchableOpacity
                            onPress={() => setShowStartPicker(true)}
                            className="flex-1 bg-white rounded-xl p-3 mr-2 border border-amber-200"
                            activeOpacity={0.7}
                        >
                            <Text className="text-xs text-gray-500 mb-1">Start Date</Text>
                            <View className="flex-row items-center justify-between">
                                <Text className="text-sm font-medium text-gray-900">
                                    {formatDate(startDate)}
                                </Text>
                                <Ionicons name="calendar-outline" size={18} color="#f59e0b" />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setShowEndPicker(true)}
                            className="flex-1 bg-white rounded-xl p-3 ml-2 border border-amber-200"
                            activeOpacity={0.7}
                        >
                            <Text className="text-xs text-gray-500 mb-1">End Date</Text>
                            <View className="flex-row items-center justify-between">
                                <Text className="text-sm font-medium text-gray-900">
                                    {formatDate(endDate)}
                                </Text>
                                <Ionicons name="calendar-outline" size={18} color="#f59e0b" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>

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
                    onScroll={handleScroll}
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

            {/* Date Pickers */}
            {showStartPicker && (
                <DateTimePicker
                    value={startDate}
                    mode="date"
                    display="default"
                    onChange={handleStartDateChange}
                    maximumDate={new Date()}
                />
            )}
            {showEndPicker && (
                <DateTimePicker
                    value={endDate}
                    mode="date"
                    display="calendar"
                    onChange={handleEndDateChange}
                    maximumDate={new Date()}
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

// StatBadge component is no longer used in renderHeader but kept for reference or other uses if any
const StatBadge = ({ label, value, color }: { label: string; value: string | number; color: string }) => {
    // ... same as before or removed if not needed elsewhere
    const colorClasses: any = {
        gray: 'bg-gray-100 text-gray-700',
        emerald: 'bg-emerald-100 text-emerald-700',
        blue: 'bg-blue-100 text-blue-700',
        red: 'bg-red-100 text-red-700',
        purple: 'bg-purple-100 text-purple-700',
    }

    return (
        <View className={`px-3 py-1.5 rounded-lg mr-2 mb-2 ${colorClasses[color]?.split(' ')[0] || 'bg-gray-100'}`}>
            <Text className="text-xs font-semibold" style={{ color: colorClasses[color]?.includes('emerald') ? '#047857' : colorClasses[color]?.includes('blue') ? '#1d4ed8' : colorClasses[color]?.includes('red') ? '#b91c1c' : colorClasses[color]?.includes('purple') ? '#7e22ce' : '#374151' }}>
                {label}: {value}
            </Text>
        </View>
    )
}

export default Campaign