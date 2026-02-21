import useCall from '@/hooks/useCall'
import { useChatStore } from '@/store/chat'
import { Ionicons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { Modal, Text, TouchableOpacity, View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withRepeat, withSequence, withTiming } from 'react-native-reanimated'

const InitiateCall = ({ onClose }: { onClose: () => void }) => {

    const { initiateCall } = useCall()
    const [isConfirmed, setIsConfirmed] = useState(false)
    const opacity = useSharedValue(1)
    const scale = useSharedValue(1)
    const scale2 = useSharedValue(1)

    const { selectedChat } = useChatStore()

    const animatedTextStyle = useAnimatedStyle(() => ({
        opacity: opacity.value
    }))

    const animatedRingStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        opacity: 1 - (scale.value - 1) * 2
    }))

    const animatedRing2Style = useAnimatedStyle(() => ({
        transform: [{ scale: scale2.value }],
        opacity: 1 - (scale2.value - 1) * 2
    }))

    useEffect(() => {
        if (isConfirmed && selectedChat?.id) {

            initiateCall.mutate(selectedChat.id, {
                onSuccess: () => {
                    setTimeout(() => onClose(), 2000)
                },
                onError: () => onClose()
            })

            opacity.value = withRepeat(
                withSequence(
                    withTiming(1, { duration: 500 }),
                    withTiming(0.30, { duration: 500 })
                ),
                -1
            )

            scale.value = withRepeat(
                withSequence(
                    withTiming(1, { duration: 0 }),
                    withTiming(1.4, { duration: 1500 })
                ),
                -1
            )

            scale2.value = withRepeat(
                withSequence(
                    withTiming(1, { duration: 0 }),
                    withDelay(300, withTiming(1.5, { duration: 1500 }))
                ),
                -1
            )
        }
    }, [isConfirmed, selectedChat?.id])

    const handleConfirm = () => setIsConfirmed(true)

    if (!selectedChat) return null

    return (
        <Modal
            visible={true}
            transparent
            statusBarTranslucent
            animationType="slide"
            onRequestClose={onClose}
        >
            <View className='flex-1 bg-black/60 justify-end'>
                {/* Confirmation View — hidden when confirmed */}
                <View style={isConfirmed ? { display: 'none' } : undefined}
                    className='bg-white pt-8 pb-10 rounded-t-[40px] px-8 items-center'>
                    <View className='w-16 h-1 bg-gray-200 rounded-full mb-8' />
                    <View className='bg-emerald-50 p-6 rounded-full mb-6'>
                        <Ionicons name="call" size={40} color="#10b981" />
                    </View>
                    <Text className='text-2xl font-JakartaBold text-neutral-800 mb-2'>Initiate Call?</Text>
                    <Text className='text-neutral-500 text-center text-base font-JakartaRegular mb-8 leading-6'>
                        You are about to start a call with{"\n"}
                        <Text className='font-JakartaBold text-neutral-800'>{selectedChat?.name}</Text>
                    </Text>

                    <View className='flex-row gap-4 w-full'>
                        <TouchableOpacity
                            onPress={onClose}
                            className='flex-1 bg-gray-100 py-4 rounded-2xl items-center'
                        >
                            <Text className='text-gray-600 font-JakartaBold text-lg'>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleConfirm}
                            className='flex-2 bg-emerald-500 py-4 px-10 rounded-2xl items-center shadow-lg shadow-emerald-200'
                        >
                            <Text className='text-white font-JakartaBold text-lg'>Start Call</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Calling View — hidden until confirmed */}
                <View style={!isConfirmed ? { display: 'none' } : undefined}
                    className='bg-white pt-12 pb-14 rounded-t-[40px] shadow-2xl items-center'>
                    <View className='w-16 h-1 bg-gray-200 rounded-full mb-10' />

                    <View className='items-center gap-1 mb-10'>
                        <Text className='text-3xl font-JakartaBold text-neutral-800' numberOfLines={1}>{selectedChat?.name}</Text>
                        <Text className='text-neutral-500 text-lg font-Jakarta tracking-wide'>{selectedChat?.phone}</Text>
                    </View>

                    {/* Avatar with Ripple Effect */}
                    <View className="mb-12 items-center justify-center">
                        <Animated.View
                            style={animatedRingStyle}
                            className="absolute bg-emerald-100 rounded-full size-40"
                        />
                        <Animated.View
                            style={animatedRing2Style}
                            className="absolute bg-emerald-100/50 rounded-full size-52"
                        />

                        <View className="bg-emerald-500 rounded-full size-32 flex items-center justify-center shadow-2xl shadow-emerald-500/50 border-4 border-white">
                            <Text className="font-JakartaBold text-6xl text-white">
                                {selectedChat?.formatted}
                            </Text>
                        </View>
                    </View>

                    <Animated.Text
                        style={animatedTextStyle}
                        className='text-center text-xl text-neutral-600 font-JakartaMedium mb-12'>
                        Calling...
                    </Animated.Text>

                    {/* Hang Up Button */}
                    <TouchableOpacity
                        onPress={onClose}
                        activeOpacity={0.8}
                        className='bg-red-500 size-20 rounded-full items-center justify-center shadow-xl shadow-red-200'
                    >
                        <Ionicons name="close" size={40} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default InitiateCall;