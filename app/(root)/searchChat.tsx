import ChatCard from '@/components/ChatCard'
import ChatCardPlaceholder from '@/components/ChatPlaceholder'
import InputField from '@/components/input-field'
import { icons, images } from '@/constants'
import useChat from '@/hooks/useChat'
import React from 'react'
import { FlatList, Image, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const SearchChat = () => {
    const { chats, onSearch, isLoading, error, isError } = useChat()

    return (
        <SafeAreaView className='flex-1'>
            <View className='px-[10px]'>
                <InputField label='' placeholder='Search by name or contact' autoFocus={true} onChangeText={onSearch} />
            </View>
            <FlatList
                data={chats}
                keyExtractor={(item) => item?.id?.toString()}
                renderItem={({ item }) => <ChatCard data={item} />}
                ListEmptyComponent={() => (
                    <View className="mt-4">
                        {isLoading ?
                            <View className="flex gap-[6px]">
                                {Array.from({ length: 10 }, (_, i) => <ChatCardPlaceholder key={i} />)}
                            </View>
                            : isError ?
                                (
                                    <View className="flex items-center justify-center gap-2 h-[20px]">
                                        <Image source={icons.error_bug as any} className="h-20 w-20 mb-2" tintColor={"#A3A3A3"} />
                                        <Text className="text-xl text-gray-500 font-JakartaSemiBold">{(error as any)?.response?.data?.message || "Something went wrong"}</Text>
                                    </View>
                                ) : (
                                    <View>
                                        <Image
                                            source={images.empty as any}
                                            className="h-[300px] w-full"
                                        />
                                        <Text className="text-neutral-400 text-lg font-Jakarta text-center">
                                            Sorry! we could not find any chats
                                        </Text>
                                    </View>
                                )}
                    </View>
                )}
                contentContainerStyle={{
                    paddingHorizontal: 10,
                    gap: 5,
                    paddingBottom: 10,
                }}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    )
}

export default SearchChat