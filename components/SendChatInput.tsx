import { icons } from '@/constants'
import React, { useState } from 'react'
import { Image, TextInput, TouchableOpacity, View } from 'react-native'


interface Props {
    onSend: (data: any) => void
    onAttachmentPress: () => void
}

const SendChatInput = ({ onSend, onAttachmentPress }: Props) => {

    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <View className='px-3 mb-3 pt-3 flex flex-row gap-2 items-start'>
                <TouchableOpacity className='bg-[#42d6a624] rounded-full mt-1.5 p-3' onPress={() => setShowModal((prev) => !prev)}>
                    <Image source={icons.clip as any} className='w-6 h-6' tintColor={'#42d6a6'} />
                </TouchableOpacity>
                <View className='bg-white rounded-3xl px-4 flex-1  border border-gray-200 flex flex-row  gap-2'>
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

        </>
    )
}

export default SendChatInput