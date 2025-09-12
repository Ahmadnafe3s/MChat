import { icons } from '@/constants'
import React from 'react'
import { Image, TextInput, TouchableOpacity, View } from 'react-native'

const SendChatInput = () => {
    return (
        <View className='px-3 mb-3 pt-3'>
            <View className='bg-white rounded-3xl px-4  border border-gray-200 flex flex-row  gap-2'>
                <TextInput
                    placeholder='Type a message'
                    className='py-4 flex-1 text-lg max-h-40'
                    multiline
                    placeholderTextColor={'#A3A3A3'}
                />
                <TouchableOpacity
                    className='bg-[#42d6a624] rounded-full size-12 flex items-center justify-center mt-auto mb-1.5'
                >
                    <Image source={icons.send as any} className='w-6 h-6' tintColor={'#42d6a6'} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SendChatInput