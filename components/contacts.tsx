import { icons, images } from "@/constants";
import useChat from "@/hooks/useChat";
import React from "react";
import {
  FlatList,
  Image,
  Text,
  View
} from "react-native";
import ChatCard from "./ChatCard";
import ChatsHeader from "./ChatHeader";
import ChatCardPlaceholder from "./ChatPlaceholder";

const Contacts = () => {
  const {
    chats,
    isLoading,
    totalChats,
    isFetchingNextPage,
    fetchNextPage,
    error,
    isError,
    filter,
    setFilter,
  } = useChat();



  return (
    <View className="flex-1 bg-gray-100">
      <FlatList
        data={chats}
        keyExtractor={(item) => item?.id?.toString()}
        renderItem={({ item }) => <ChatCard data={item} />}
        initialNumToRender={10}
        maxToRenderPerBatch={20}
        windowSize={10}
        removeClippedSubviews={true}
        ListEmptyComponent={
          <View className="mt-4">
            {isLoading ? (
              <View className="flex gap-[6px]">
                {Array.from({ length: 7 }, (_, i) => (
                  <ChatCardPlaceholder key={i} />
                ))}
              </View>
            ) : isError ? (
              <View className="flex items-center justify-center gap-2 h-[20px]">
                <Image
                  source={icons.error_bug as any}
                  className="h-20 w-20 mb-2"
                  tintColor={"#A3A3A3"}
                />
                <Text className="text-xl text-gray-500 font-JakartaSemiBold">
                  {(error as any)?.response?.data?.message ||
                    "Something went wrong"}
                </Text>
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
        }
        onEndReached={() => fetchNextPage()}
        ListHeaderComponent={<ChatsHeader filter={filter} setFilter={setFilter} totalChats={totalChats} />} // if user function is not memoized, it will re-render
        ListFooterComponent={
          <View className="mb-4">
            {isFetchingNextPage && <ChatCardPlaceholder />}
          </View>
        }
        contentContainerStyle={{
          paddingHorizontal: 10,
          gap: 5,
          paddingBottom: 10,
        }}
      />
    </View>
  );
};

export default Contacts;




