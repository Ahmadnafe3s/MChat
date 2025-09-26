import { icons } from '@/constants'
import React from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'

interface QuickReplyCardProps {
    data: QuickReply
    onSend?: () => void
}

const QuickReplyCard = ({ data, onSend }: QuickReplyCardProps) => {
    return (
        <View className='bg-white border border-gray-200 py-3 px-4 rounded-xl'>
            <View className='flex flex-row items-center mb-2'>
                <Text
                    className='text-neutral-700 font-JakartaSemiBold text-xl flex-1 mr-2'
                    numberOfLines={1}
                >
                    {data.name}
                </Text>
                <TouchableOpacity
                    className="bg-[#42d6a624] rounded-full p-2"
                    onPress={onSend}
                >
                    <Image source={icons.send as any} className='w-5 h-5' tintColor={"#42d6a6"} />
                </TouchableOpacity>
            </View>
            <ScrollView className='max-h-36'>
                <Text
                    className='text-neutral-500 text-sm mt-1'
                >
                    {data.content}
                </Text>
            </ScrollView>
        </View>
    )
}

export default QuickReplyCard