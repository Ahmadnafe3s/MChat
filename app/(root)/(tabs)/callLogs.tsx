import { icons } from '@/constants'
import useCall from '@/hooks/useCall'
import { Ionicons } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker'
import { FlashList } from '@shopify/flash-list'
import { useRouter } from 'expo-router'
import React from 'react'
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'

const genDate = (date: Date) => date.toISOString().split('T')[0]

const FilterHeaderHeight = 120

const CallLogs = () => {
    const router = useRouter()
    const [startDate, setStartDate] = React.useState(new Date())
    const [endDate, setEndDate] = React.useState(new Date())
    const [showStartPicker, setShowStartPicker] = React.useState(false)
    const [showEndPicker, setShowEndPicker] = React.useState(false)
    const { getCallLogs } = useCall()
    const { data, isLoading, isError } = getCallLogs(genDate(startDate), genDate(endDate))

    const filterHeight = useSharedValue(FilterHeaderHeight)

    const statuses = data?.statuses
    const callLogs = data?.data || []

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


    const getCallIcon = (direction: string, status: string) => {
        if (status === 'missed') {
            return { name: 'call-outline', color: '#ef4444' }
        }
        return {
            name: direction === 'incoming' ? 'call-outline' : 'call-outline',
            color: direction === 'incoming' ? '#10b981' : '#3b82f6'
        }
    }

    const formatDuration = (seconds: string) => {
        const sec = parseInt(seconds)
        if (sec < 60) return `${sec}s`
        const mins = Math.floor(sec / 60)
        const secs = sec % 60
        return `${mins}m ${secs}s`
    }


    const animatedStyle = useAnimatedStyle(() => ({
        height: filterHeight.value,
    }), [])

    const handleScroll = (event: any) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        const newHeight = Math.max(FilterHeaderHeight - offsetY, 0);
        filterHeight.value = withTiming(newHeight);
    };

    const renderCallItem = ({ item }: { item: CallLogs['data'][0] }) => (
        <TouchableOpacity
            className="bg-white mx-4 mb-3 rounded-xl p-4 shadow-sm border border-emerald-50"
            activeOpacity={0.7}
        >
            <View className="flex-row items-center">
                <View className={`w-12 h-12 rounded-full items-center justify-center ${item.call_status === 'missed' ? 'bg-red-50' :
                    item.direction === 'incoming' ? 'bg-emerald-50' : 'bg-blue-50'
                    }`}>
                    <Ionicons
                        name={getCallIcon(item.direction, item.call_status).name as any}
                        size={24}
                        color={getCallIcon(item.direction, item.call_status).color}
                    />
                </View>

                <View className="flex-1 ml-3">
                    <Text className="text-gray-900 font-semibold text-base">
                        {item.contact_name !== 'N/A' ? item.contact_name : item.contact_phone}
                    </Text>
                    <View className="flex-row items-center mt-1">
                        <Text className="text-gray-500 text-sm">{item.agent_name}</Text>
                        <View className="w-1 h-1 rounded-full bg-gray-400 mx-2" />
                        <Text className={`text-sm capitalize ${item.call_status === 'missed' ? 'text-red-500' : 'text-emerald-600'
                            }`}>
                            {item.call_status}
                        </Text>
                    </View>
                </View>

                <View className="items-end">
                    <Text className="text-gray-900 text-sm font-medium">
                        {item.call_date}
                    </Text>
                    <Text className="text-gray-500 text-xs mt-1">
                        {formatDuration(item.duration)}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )


    const renderHeader = () => (
        <>
            {!isLoading && statuses && (
                <View className="px-4 py-3">
                    <ScrollView
                        horizontal
                        nestedScrollEnabled
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingRight: 16 }}
                        className="flex-row"
                    >
                        {headerStyleCoinfig(statuses).map((item, index) => (
                            <View
                                key={index}
                                className={`mr-3 ${item.bgColor} flex flex-row gap-2 items-center rounded-2xl px-4 py-2 border ${item.borderColor} shadow-sm ${index === 0 ? 'w-40' : 'w-36'
                                    }`}
                                style={{
                                    shadowColor: item.icon,
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.1,
                                    shadowRadius: 8,
                                    elevation: 3,
                                }}
                            >
                                {/* Icon Container */}
                                <View
                                    className={`w-12 h-12 rounded-xl bg-white items-center justify-center mb-3`}
                                    style={{
                                        shadowColor: '#000',
                                        shadowOffset: { width: 0, height: 1 },
                                        shadowOpacity: 0.05,
                                        shadowRadius: 2,
                                        elevation: 1,
                                    }}
                                >
                                    <Image
                                        source={icons[item.iconName as keyof typeof icons] as any}
                                        className='size-6'
                                        tintColor={item.icon}
                                    />
                                </View>

                                {/* Stats Content */}
                                <View>
                                    <Text className={`text-3xl font-extrabold ${item.color} mb-1`}>
                                        {item.value}
                                    </Text>
                                    <Text className="text-gray-600 text-xs font-medium tracking-wide">
                                        {item.label}
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            )}
        </>
    );



    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
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
                        Call History
                    </Text>
                </View>
            </View>

            {/* Date Filter Section */}
            <Animated.View style={[animatedStyle, { overflow: 'hidden' }]}>
                <View className="bg-emerald-50 px-4 py-4 border-b border-emerald-100">
                    <Text className="text-sm font-semibold text-gray-700 mb-3">Filter by Date</Text>
                    <View className="flex-row items-center justify-between">
                        <TouchableOpacity
                            onPress={() => setShowStartPicker(true)}
                            className="flex-1 bg-white rounded-xl p-3 mr-2 border border-emerald-200"
                            activeOpacity={0.7}
                        >
                            <Text className="text-xs text-gray-500 mb-1">Start Date</Text>
                            <View className="flex-row items-center justify-between">
                                <Text className="text-sm font-medium text-gray-900">
                                    {formatDate(startDate)}
                                </Text>
                                <Ionicons name="calendar-outline" size={18} color="#059669" />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setShowEndPicker(true)}
                            className="flex-1 bg-white rounded-xl p-3 ml-2 border border-emerald-200"
                            activeOpacity={0.7}
                        >
                            <Text className="text-xs text-gray-500 mb-1">End Date</Text>
                            <View className="flex-row items-center justify-between">
                                <Text className="text-sm font-medium text-gray-900">
                                    {formatDate(endDate)}
                                </Text>
                                <Ionicons name="calendar-outline" size={18} color="#059669" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>

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

            {/* FlashList to show call logs */}
            {isLoading ? (
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator size="large" color="#059669" />
                    <Text className="text-gray-500 mt-4">Loading call logs...</Text>
                </View>
            ) : isError ? (
                <View className="flex-1 items-center justify-center px-4">
                    <Ionicons name="alert-circle-outline" size={64} color="#ef4444" />
                    <Text className="text-gray-900 text-lg font-semibold mt-4">
                        Failed to load call logs
                    </Text>
                    <Text className="text-gray-500 text-center mt-2">
                        Please try again later
                    </Text>
                </View>
            ) : (
                <FlashList
                    data={callLogs}
                    renderItem={renderCallItem}
                    estimatedItemSize={88}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ paddingTop: 8, paddingBottom: 16 }}
                    ListHeaderComponent={renderHeader()}
                    ListEmptyComponent={
                        <View className="flex-1 items-center justify-center py-20">
                            <Ionicons name="call-outline" size={64} color="#d1d5db" />
                            <Text className="text-gray-500 text-lg mt-4">
                                No call logs found
                            </Text>
                        </View>
                    }
                    onScroll={handleScroll}
                />
            )}
        </SafeAreaView>
    )
}

export default CallLogs










const headerStyleCoinfig = (statuses: any) => (
    [
        {
            label: 'Total Calls',
            value: statuses.total,
            color: 'text-amber-500',
            bgColor: 'bg-amber-50',
            borderColor: 'border-amber-200',
            icon: '#f59e0b',
            iconName: 'call'
        },
        {
            label: 'Missed',
            value: statuses.missed,
            color: 'text-red-500',
            bgColor: 'bg-red-50',
            borderColor: 'border-red-200',
            icon: "#ef4444",
            iconName: 'call_missed'
        },
        {
            label: 'Answered',
            value: statuses.answered,
            color: "text-green-500",
            bgColor: 'bg-green-50',
            borderColor: 'border-green-200',
            icon: '#10b981',
            iconName: 'call'
        },
        {
            label: 'Outgoing',
            value: statuses.outgoing,
            color: 'text-blue-500',
            bgColor: 'bg-blue-50',
            borderColor: 'border-blue-200',
            icon: '#3b82f6',
            iconName: 'call_outgoing'
        },
        {
            label: 'Incoming',
            value: statuses.incoming,
            color: 'text-emerald-500',
            bgColor: 'bg-emerald-50',
            borderColor: 'border-emerald-200',
            icon: '#16a34a',
            iconName: 'call_incoming'
        },
    ]
)