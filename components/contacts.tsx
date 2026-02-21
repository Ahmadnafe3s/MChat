import useChat from "@/hooks/useChat";
import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import React, { forwardRef } from "react";
import { NativeScrollEvent, NativeSyntheticEvent, Text, View } from "react-native";
import ChatCard from "./ChatCard";
import ChatsHeader from "./ChatHeader";
import ChatCardPlaceholder from "./ChatPlaceholder";

interface ContactsProps {
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

const Contacts = forwardRef<FlashList<any>, ContactsProps>(({ onScroll }, ref) => {
  const {
    search,
    onSearch,
    chats,
    isLoading,
    totalChats,
    isFetchingNextPage,
    fetchNextPage,
    error,
    isError,
    filter,
    hasNextPage,
    setFilter,
  } = useChat("chats");


  const renderEmpty = () => (
    <View className="flex-1">
      {isLoading ? (
        <View className="flex gap-[6px]">
          {Array.from({ length: 7 }, (_, i) => (
            <ChatCardPlaceholder key={i} />
          ))}
        </View>
      ) : isError ? (
        <View className="flex-1 items-center justify-center px-8 pt-40">
          <Ionicons name="alert-circle-outline" size={64} color="#ef4444" />
          <Text className="text-lg font-semibold text-gray-900 mt-4 mb-2">
            Error Loading chats
          </Text>
          <Text className="text-sm text-gray-600 text-center">
            {error?.message || 'Something went wrong'}
          </Text>
        </View>
      ) : (
        < View className="flex-1 items-center justify-center px-8 pt-40">
          <Ionicons name="chatbox" size={64} color="#d1d5db" />
          <Text className="text-lg font-semibold text-gray-900 mt-4 mb-2">
            No Chats Found
          </Text>
          <Text className="text-sm text-gray-600 text-center px-8">
            Try refreshing your chats
          </Text>
        </View>
      )}
    </View>
  )

  return (
    <View className="flex-1">
      <FlashList
        ref={ref}
        onScroll={onScroll}
        data={chats}
        keyExtractor={(item) => item?.id?.toString()}
        renderItem={({ item }) => <ChatCard data={item} />}
        removeClippedSubviews={true}
        onEndReachedThreshold={0.1}
        estimatedItemSize={94}
        ListEmptyComponent={renderEmpty}
        onEndReached={() => {
          hasNextPage && fetchNextPage();
        }}
        ListHeaderComponent={
          <ChatsHeader
            options={[
              "All", "Active", "Unread", "Expired", "Blocked",
              "Assigned", "Open", "Solved", "Pending", "Starred"
            ]}
            filter={filter}
            setFilter={setFilter}
            serach={search}
            onSearch={onSearch}
            totalChats={totalChats}
          />
        } // if user function is not memoized, it will re-render
        ListFooterComponent={
          <View className="mb-20">
            {isFetchingNextPage && <ChatCardPlaceholder />}
          </View>
        }
        contentContainerStyle={{
          paddingHorizontal: 10,
          paddingBottom: 50,
        }}
      />
    </View>
  );
});

export default Contacts;
