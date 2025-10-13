import useCall from '@/hooks/useCall'
import { Ionicons } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker'
import { FlashList } from '@shopify/flash-list'
import { useRouter } from 'expo-router'
import React from 'react'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


const CallLogs = () => {
    const router = useRouter()
    const { getCallLogs } = useCall()
    const [params, setParams] = React.useState({ start_date: "", end_date: "" })
    const { data, isLoading, isError } = getCallLogs(params.start_date, params.end_date)

    const [showStartPicker, setShowStartPicker] = React.useState(false)
    const [showEndPicker, setShowEndPicker] = React.useState(false)
    const [startDate, setStartDate] = React.useState(new Date())
    const [endDate, setEndDate] = React.useState(new Date())

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
        if (selectedDate) {
            setStartDate(selectedDate)
            setParams(prev => ({
                ...prev,
                start_date: selectedDate.toISOString().split('T')[0]
            }))
        }
    }

    const handleEndDateChange = (event: any, selectedDate?: Date) => {
        setShowEndPicker(false)
        if (selectedDate) {
            setEndDate(selectedDate)
            setParams(prev => ({
                ...prev,
                end_date: selectedDate.toISOString().split('T')[0]
            }))
        }
    }

    const clearFilters = () => {
        setStartDate(new Date())
        setEndDate(new Date())
        setParams({ start_date: "", end_date: "" })
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
                                {params.start_date ? formatDate(startDate) : 'Select date'}
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
                                {params.end_date ? formatDate(endDate) : 'Select date'}
                            </Text>
                            <Ionicons name="calendar-outline" size={18} color="#059669" />
                        </View>
                    </TouchableOpacity>
                </View>

                {(params.start_date || params.end_date) && (
                    <TouchableOpacity
                        onPress={clearFilters}
                        className="mt-3 bg-white rounded-xl py-2 px-4 self-center border border-emerald-200"
                        activeOpacity={0.7}
                    >
                        <View className="flex-row items-center">
                            <Ionicons name="close-circle" size={16} color="#059669" />
                            <Text className="text-sm font-medium text-emerald-600 ml-1">
                                Clear Filters
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
            </View>

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
                    display="default"
                    onChange={handleEndDateChange}
                    maximumDate={new Date()}
                    minimumDate={startDate}
                />
            )}

            {/* Header to show statuses */}
            {!isLoading && statuses && (
                <View className="px-4 py-4 bg-white">
                    <View className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
                        <View className="flex-row flex-wrap">
                            <View className="w-1/2 mb-4">
                                <Text className="text-3xl font-bold text-emerald-600">
                                    {statuses.total}
                                </Text>
                                <Text className="text-gray-600 text-sm mt-1">Total Calls</Text>
                            </View>
                            <View className="w-1/2 mb-4">
                                <Text className="text-3xl font-bold text-red-500">
                                    {statuses.missed}
                                </Text>
                                <Text className="text-gray-600 text-sm mt-1">Missed</Text>
                            </View>
                            <View className="w-1/2">
                                <Text className="text-2xl font-bold text-emerald-600">
                                    {statuses.answered}
                                </Text>
                                <Text className="text-gray-600 text-sm mt-1">Answered</Text>
                            </View>
                            <View className="w-1/2">
                                <View className="flex-row items-center space-x-4">
                                    <View>
                                        <Text className="text-xl font-semibold text-blue-600">
                                            {statuses.outgoing}
                                        </Text>
                                        <Text className="text-gray-600 text-xs">Outgoing</Text>
                                    </View>
                                    <View>
                                        <Text className="text-xl font-semibold text-green-600">
                                            {statuses.incoming}
                                        </Text>
                                        <Text className="text-gray-600 text-xs">Incoming</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
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
                    ListEmptyComponent={
                        <View className="flex-1 items-center justify-center py-20">
                            <Ionicons name="call-outline" size={64} color="#d1d5db" />
                            <Text className="text-gray-500 text-lg mt-4">
                                No call logs found
                            </Text>
                        </View>
                    }
                />
            )}
        </SafeAreaView>
    )
}

export default CallLogs