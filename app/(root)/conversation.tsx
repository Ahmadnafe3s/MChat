import { icons } from '@/constants';
import { useChatStore } from '@/store/chat';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const Coversation = () => {
  const router = useRouter();
  const { selectedChat } = useChatStore();

  console.log(selectedChat)

  return (
    <View className='flex-1'>
      {/* Header */}
      <View className='flex flex-row px-4 pb-3 items-center justify-between bg-white pt-14'>
        {/* Flex 1 */}
        <View className='flex flex-row gap-2 items-center'>
          <TouchableOpacity onPress={() => router.back()}>
            <Image source={icons.moveLeft as any} className='w-6 h-6' />
          </TouchableOpacity>
          <View className='bg-green-100 rounded-full size-12 flex items-center justify-center'>
            <Text className='font-JakartaSemiBold text-2xl text-green-500'>{selectedChat?.formatted}</Text>
          </View>
          <Text className='text-lg text-neutral-700 font-Jakarta' numberOfLines={1}>{selectedChat?.name}</Text>
        </View>
        {/* Flex 2 */}
        <View className='flex flex-row items-center gap-2'>
          <Image source={icons.star as any} className='w-6 h-6' tintColor={'#ffbb00'} />
          <Image source={icons.more as any} className='w-6 h-6' />
        </View>
      </View>
    </View>
  )
}

export default Coversation