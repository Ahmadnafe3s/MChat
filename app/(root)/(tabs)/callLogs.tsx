import CallItem from '@/components/callLogs/CallItem'
import CallStatusCards from '@/components/callLogs/CallStatusCards'
import DateFilter, { DateFilterRef, genDate } from '@/components/DateFilter'
import MessageTemplate from '@/components/MessageTemplate'
import { useCallLogs } from '@/hooks/useCall'
import useTemplate from '@/hooks/useTemplate'
import { Ionicons } from '@expo/vector-icons'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { FlashList } from '@shopify/flash-list'
import { useRouter } from 'expo-router'
import React, { useCallback, useRef } from 'react'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const CallLogs = () => {
    const router = useRouter()
    const [selectedStatus, setSelectedStatus] = React.useState('All')
    const [selectedCall, setSelectedCall] = React.useState<Set<number>>(new Set())
    const [startDate, setStartDate] = React.useState(genDate(new Date()))
    const [endDate, setEndDate] = React.useState(genDate(new Date()))
    const dateFilterRef = useRef<DateFilterRef>(null)
    const templateRef = useRef<BottomSheetModal>(null)
    const { sendBulkTemplate } = useTemplate()

    const {
        data,
        isLoading,
        isError,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage
    } = useCallLogs(startDate, endDate, selectedStatus)

    const statuses = data?.pages[0]?.statuses
    const callLogs = data?.pages.flatMap(page => page.data ?? []) ?? []

    const handleDateChange = useCallback((start: string, end: string) => {
        setStartDate(start)
        setEndDate(end)
    }, [])

    const handleLongPress = (item: CallLogs['data'][0]) => {
        setSelectedCall((prev) => {
            const newSet = new Set(prev)
            if (newSet.has(item.contact_id)) {
                newSet.delete(item.contact_id)
            } else {
                newSet.add(item.contact_id)
            }
            return newSet
        })
    }

    const handlePress = (item: CallLogs['data'][0]) => {
        if (selectedCall.size > 0) {
            handleLongPress(item)
        }
    }

    const getUniqueCallLogs = () => {
        const seen = new Set();
        return callLogs.filter(item => {
            if (seen.has(item.contact_id)) return false;
            seen.add(item.contact_id);
            return true;
        });

    }

    const handleSendTemplate = (template: SendTemplate) => {
        if (selectedCall.size === 0) return
        const contactIds = Array.from(selectedCall).join(',')
        sendBulkTemplate.mutate({ templateId: template.templateId, contactIds, data: template.data }, {
            onSuccess: () => {
                setSelectedCall(new Set())
                templateRef.current?.dismiss()
            }
        })
    }

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
            {/* Header */}
            <View className="bg-white px-4 py-4 border-b border-gray-200">
                <View className="flex-row items-center justify-between">
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

                    {selectedCall.size > 0 && (
                        <TouchableOpacity
                            className="bg-blue-50 px-4 py-2 rounded-md"
                            activeOpacity={0.7}
                            onPress={() => templateRef.current?.present()}
                        >
                            <Text className="text-blue-500 text-sm font-semibold">Send Template</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {/* Date Filter */}
            <DateFilter
                ref={dateFilterRef}
                variant="emerald"
                onDateChange={handleDateChange}
            />

            {/* Call Logs List */}
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
                    data={selectedCall.size === 0 ? callLogs : getUniqueCallLogs()}
                    renderItem={({ item }) => (
                        <CallItem
                            item={item}
                            isSelected={selectedCall.has(item.contact_id)}
                            onLongPress={() => handleLongPress(item)}
                            onPress={() => handlePress(item)}
                        />
                    )}
                    estimatedItemSize={88}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ paddingTop: 8, paddingBottom: 16 }}
                    ListHeaderComponent={
                        !isLoading && statuses ? (
                            <CallStatusCards
                                statuses={statuses}
                                count={data.pages[0].count}
                                onStatusSelect={setSelectedStatus}
                            />
                        ) : null
                    }
                    ListEmptyComponent={
                        <View className="flex-1 items-center justify-center py-20">
                            <Ionicons name="call-outline" size={64} color="#d1d5db" />
                            <Text className="text-gray-500 text-lg mt-4">
                                No call logs found
                            </Text>
                        </View>
                    }
                    scrollEventThrottle={16}
                    onEndReached={() => {
                        if (hasNextPage && !isFetchingNextPage) {
                            fetchNextPage()
                        }
                    }}
                    onEndReachedThreshold={1}
                    ListFooterComponent={
                        isFetchingNextPage ?
                            <ActivityIndicator size="small" color="#059669" className="py-4" />
                            : null
                    }
                    onScroll={(e) => dateFilterRef.current?.handleScroll(e)}
                />
            )}

            <MessageTemplate ref={templateRef} onSend={handleSendTemplate} isLoading={sendBulkTemplate.isPending} />
        </SafeAreaView>
    )
}

export default CallLogs