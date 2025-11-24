import ChatsHeader from '@/components/ChatHeader'
import ChatCardPlaceholder from '@/components/ChatPlaceholder'
import ContactCard from '@/components/contactCard'
import useContact from '@/hooks/useContact'
import { Ionicons } from '@expo/vector-icons'
import { FlashList } from '@shopify/flash-list'
import { useRouter } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Contacts = () => {
    const router = useRouter()
    const { getConatct, status, setStatus, onSearch, search } = useContact()

    const contacts = getConatct.data?.pages.flatMap((page) => page?.data ?? []) ?? [];
    const total = getConatct.data?.pages.flat()[0].total ?? 0

    const renderEmpty = () => (
        <View className="flex-1">
            {getConatct.isLoading ? (
                <View className="flex gap-[6px]">
                    {Array.from({ length: 7 }, (_, i) => (
                        <ChatCardPlaceholder key={i} />
                    ))}
                </View>
            ) : getConatct.isError ? (
                <View className="flex-1 items-center justify-center px-8 pt-40">
                    <Ionicons name="alert-circle-outline" size={64} color="#ef4444" />
                    <Text className="text-lg font-semibold text-gray-900 mt-4 mb-2">
                        Error Loading contacts
                    </Text>
                    <Text className="text-sm text-gray-600 text-center">
                        {getConatct.error?.message || 'Something went wrong'}
                    </Text>
                </View>
            ) : (
                < View className="flex-1 items-center justify-center px-8 pt-40">
                    <Ionicons name="person" size={64} color="#d1d5db" />
                    <Text className="text-lg font-semibold text-gray-900 mt-4 mb-2">
                        No Contacts Found
                    </Text>
                    <Text className="text-sm text-gray-600 text-center px-8">
                        Try refreshing your contacts
                    </Text>
                </View>
            )}
        </View>
    )

    return (
        <SafeAreaView className='flex-1 bg-white'>
            <View className="bg-white px-4 py-4 border-b border-gray-200">
                <View className="flex-row items-center">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="w-10 h-10 items-center justify-center rounded-full bg-emerald-50"
                        activeOpacity={0.7}
                    >
                        <Ionicons name="arrow-back" size={24} color="#059669" />
                    </TouchableOpacity>
                    <Text className="text-2xl font-bold text-gray-900 ml-3">
                        Contacts
                    </Text>
                </View>
            </View>
            <View className="flex-1">
                <FlashList
                    data={contacts}
                    keyExtractor={(item) => item?.id?.toString()}
                    renderItem={({ item }) => <ContactCard data={item} />}
                    removeClippedSubviews={true}
                    onEndReachedThreshold={0.1}
                    estimatedItemSize={94}
                    ListEmptyComponent={renderEmpty}
                    onEndReached={() => {
                        getConatct.hasNextPage && getConatct.fetchNextPage();
                    }}
                    ListHeaderComponent={
                        <ChatsHeader
                            options={['All', 'WhatsApp', 'Voice']}
                            filter={status}
                            serach={search}
                            onSearch={onSearch}
                            setFilter={setStatus}
                            totalChats={total}
                        />
                    }
                    ListFooterComponent={
                        <View className="mb-20">
                            {getConatct.isFetchingNextPage && <ChatCardPlaceholder />}
                        </View>
                    }
                    contentContainerStyle={{
                        paddingHorizontal: 10,
                        paddingBottom: 50,

                    }}
                />
            </View>
        </SafeAreaView>
    )
}

export default Contacts