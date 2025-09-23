import { icons } from '@/constants';
import { useChatStore } from '@/store/chat';
import { useRouter } from 'expo-router';
import React, { memo } from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import Dropdown from './Dropdown';

const ConversationHeader = memo(
    () => {
        const router = useRouter();
        const { selectedChat } = useChatStore();
        console.log(selectedChat)
        return (
            <View className='flex flex-row px-4 pb-3 items-center justify-between bg-white mt-1 border-b border-gray-200'>
                {/* Flex 1 */}
                <View className='flex flex-row gap-2 items-center'>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Image source={icons.moveLeft as any} className='w-6 h-6' />
                    </TouchableOpacity>
                    <View className='bg-emerald-100 rounded-full size-12 flex items-center justify-center'>
                        <Text className='font-JakartaSemiBold text-2xl text-emerald-500'>{selectedChat?.formatted}</Text>
                    </View>
                    <Text className='text-lg text-neutral-700 font-Jakarta' numberOfLines={1}>{selectedChat?.name}</Text>
                </View>
                {/* Flex 2 */}
                <View className='flex flex-row items-center gap-4'>
                    <Image source={icons.star as any} className='w-6 h-6' tintColor={'#ffbb00'} />
                    <Dropdown
                        options={['Template', 'Clear Chat', 'Block Contact']}
                        icon={icons.more as any}
                        iconStyle={{ width: 20, height: 20 }}
                        iconBgStyle='bg-white'
                        onSelect={(value) => { Alert.alert(value) }}
                    />
                </View>
            </View>
        )
    }
)

ConversationHeader.displayName = "ConversationHeader"

export default ConversationHeader