import useCall from '@/hooks/useCall'
import { useChatStore } from '@/store/chat'
import React, { useEffect } from 'react'
import { Modal, Text, View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated'

const InitiateCall = ({ isVisible, onClose }: { isVisible: boolean, onClose: () => void }) => {

    const { initiateCall } = useCall()
    const opacity = useSharedValue(1)
    const scale = useSharedValue(1)

    const { selectedChat } = useChatStore()

    const animatedTextStyle = useAnimatedStyle(() => ({
        opacity: opacity.value
    }))

    const animatedRingStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        opacity: 1 - (scale.value - 1) * 2
    }))

    useEffect(() => {
        if (isVisible) {

            initiateCall.mutate(selectedChat?.id!, {
                onSuccess: () => onClose(),
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
        }
    }, [isVisible])

    return (
        <Modal
            visible={isVisible}
            transparent
            statusBarTranslucent
            animationType="fade"
        >
            <View className='flex-1 bg-black/40 justify-end'>
                <View className='bg-white pt-12 pb-10 rounded-t-3xl shadow-2xl'>
                    {/* Header Info */}
                    <View className='flex items-center gap-2 px-6'>
                        <Text className='text-3xl font-JakartaBold text-neutral-800'>{selectedChat?.name}</Text>
                        <Text className='text-neutral-500 text-lg font-Jakarta tracking-wide'>{selectedChat?.phone}</Text>
                    </View>

                    {/* Avatar with Ripple Effect */}
                    <View className="mt-8 mb-6 items-center justify-center">
                        {/* Animated Ripple Rings */}
                        <Animated.View
                            style={animatedRingStyle}
                            className="absolute bg-emerald-200 rounded-full size-32"
                        />
                        <Animated.View
                            style={[animatedRingStyle, {
                                transform: [{
                                    scale: useSharedValue(1).value
                                }]
                            }]}
                            className="absolute bg-emerald-200/30 rounded-full size-40"
                        />

                        {/* Main Avatar Circle */}
                        <View className="bg-emerald-400 rounded-full size-32 flex items-center justify-center shadow-lg shadow-emerald-500/50">
                            <Text className="font-JakartaBold text-6xl text-white">
                                {selectedChat?.formatted}
                            </Text>
                        </View>
                    </View>

                    {/* Calling Status */}
                    <Animated.Text
                        style={animatedTextStyle}
                        className='text-center text-xl mt-4 text-neutral-600 font-JakartaMedium mb-8'>
                        Calling...
                    </Animated.Text>


                </View>
            </View>
        </Modal>
    )
}

export default InitiateCall