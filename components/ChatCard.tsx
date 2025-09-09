import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const ChatCard = ({ data }: { data: Chat }) => {

    const arrayedName = data?.name?.split(' ')

    return (
        <TouchableOpacity className='bg-white px-4 py-4 flex flex-row items-center gap-2 rounded-2xl'>
            <View className='bg-green-500 rounded-full size-14 flex items-center justify-center'>
                <Text className='font-JakartaBold text-2xl uppercase text-white'>
                    {arrayedName?.[0]?.charAt(0)}
                    {arrayedName?.[1]?.charAt(0)}
                </Text>
            </View>

            <View className='flex flex-1'>
                <Text className='text-xl font-JakartaSemiBold text-gray-600'>{data?.name}</Text>
                <Text numberOfLines={1} className='text-neutral-400 mr-5 font-JakartaSemiBold'>
                    {data?.last_message}
                </Text>
            </View>

            <View className='flex items-center gap-2'>
                <Text className='text-neutral-400 text-sm font-JakartaBold'>{data?.last_chat}</Text>
                {
                    data?.unread_count > 0 &&
                    <Text className="bg-green-500 px-2 py-1 rounded-full text-white">{data?.unread_count}</Text>
                }
            </View>
        </TouchableOpacity>
    )
}

export default ChatCard