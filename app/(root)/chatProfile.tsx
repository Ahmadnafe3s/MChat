import { icons } from '@/constants'
import { useChatStore } from '@/store/chat'
import { useRouter } from 'expo-router'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller'
import { SafeAreaView } from 'react-native-safe-area-context'

const ChatProfile = () => {
    const { selectedChat } = useChatStore()
    const router = useRouter()
    return (
        <SafeAreaView className='flex-1 bg-white'>
            <View className='flex flex-row items-center px-5 py-3 mt-1 border-b border-gray-200 gap-2'>
                <TouchableOpacity onPress={() => router.back()}>
                    <Image source={icons.moveLeft as any} className="w-6 h-6" />
                </TouchableOpacity>
                <Text className='text-xl font-JakartaSemiBold'>Chat Profile</Text>
            </View>

            <KeyboardAwareScrollView className='flex-1' bottomOffset={100}>
                <View className='flex-1 mt-5 p-2 bg-slate-50 mx-3 rounded-2xl gap-5'>
                    <View className='flex items-center mt-5 gap-1'>
                        <View className="bg-emerald-100 rounded-full size-28 flex items-center justify-center">
                            <Text className="font-JakartaSemiBold text-4xl text-emerald-500">
                                {selectedChat?.formatted}
                            </Text>
                        </View>
                        <Text className='text-2xl font-JakartaSemiBold'>{selectedChat?.name}</Text>
                        <Text className=' text-neutral-400 font-Jakarta'>{selectedChat?.phone}</Text>
                    </View>

                    <Text >Submit As - Open</Text>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

export default ChatProfile