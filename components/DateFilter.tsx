import { Ionicons } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker'
import React, { forwardRef, useCallback, useImperativeHandle } from 'react'
import { NativeScrollEvent, NativeSyntheticEvent, Text, TouchableOpacity, View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

const FilterHeaderHeight = 120

const VARIANTS = {
    emerald: {
        bg: 'bg-emerald-50',
        border: 'border-emerald-100',
        inputBorder: 'border-emerald-200',
        iconColor: '#059669',
    },
    amber: {
        bg: 'bg-amber-50',
        border: 'border-amber-100',
        inputBorder: 'border-amber-200',
        iconColor: '#f59e0b',
    },
}

export interface DateFilterRef {
    handleScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
}

interface DateFilterProps {
    variant?: 'emerald' | 'amber'
    onDateChange: (startDate: string, endDate: string) => void
}

const genDate = (date: Date) => date.toISOString().split('T')[0]

const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    })
}

const DateFilter = forwardRef<DateFilterRef, DateFilterProps>(({ variant = 'emerald', onDateChange }, ref) => {
    const [startDate, setStartDate] = React.useState(new Date())
    const [endDate, setEndDate] = React.useState(new Date())
    const [showStartPicker, setShowStartPicker] = React.useState(false)
    const [showEndPicker, setShowEndPicker] = React.useState(false)

    const filterHeight = useSharedValue(FilterHeaderHeight)
    const colors = VARIANTS[variant]

    const animatedStyle = useAnimatedStyle(() => ({
        height: filterHeight.value,
    }), [])

    const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetY = event.nativeEvent.contentOffset.y
        const newHeight = Math.max(FilterHeaderHeight - offsetY, 0)
        filterHeight.value = withTiming(newHeight, { duration: 100 })
    }, [])

    useImperativeHandle(ref, () => ({
        handleScroll,
    }), [handleScroll])

    const handleStartDateChange = useCallback((event: any, selectedDate?: Date) => {
        setShowStartPicker(false)
        if (event.type === 'set' && selectedDate) {
            setStartDate(selectedDate)
            onDateChange(genDate(selectedDate), genDate(endDate))
        }
    }, [endDate, onDateChange])

    const handleEndDateChange = useCallback((event: any, selectedDate?: Date) => {
        setShowEndPicker(false)
        if (event.type === 'set' && selectedDate) {
            setEndDate(selectedDate)
            onDateChange(genDate(startDate), genDate(selectedDate))
        }
    }, [startDate, onDateChange])

    return (
        <>
            <Animated.View style={[animatedStyle, { overflow: 'hidden' }]}>
                <View className={`${colors.bg} px-4 py-4 border-b ${colors.border}`}>
                    <Text className="text-sm font-semibold text-gray-700 mb-3">Filter by Date</Text>
                    <View className="flex-row items-center justify-between">
                        <TouchableOpacity
                            onPress={() => setShowStartPicker(true)}
                            className={`flex-1 bg-white rounded-xl p-3 mr-2 border ${colors.inputBorder}`}
                            activeOpacity={0.7}
                        >
                            <Text className="text-xs text-gray-500 mb-1">Start Date</Text>
                            <View className="flex-row items-center justify-between">
                                <Text className="text-sm font-medium text-gray-900">
                                    {formatDate(startDate)}
                                </Text>
                                <Ionicons name="calendar-outline" size={18} color={colors.iconColor} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setShowEndPicker(true)}
                            className={`flex-1 bg-white rounded-xl p-3 ml-2 border ${colors.inputBorder}`}
                            activeOpacity={0.7}
                        >
                            <Text className="text-xs text-gray-500 mb-1">End Date</Text>
                            <View className="flex-row items-center justify-between">
                                <Text className="text-sm font-medium text-gray-900">
                                    {formatDate(endDate)}
                                </Text>
                                <Ionicons name="calendar-outline" size={18} color={colors.iconColor} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>

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
        </>
    )
})

export default DateFilter
export { genDate }

