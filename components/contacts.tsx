import { icons, images } from "@/constants";
import useChat from "@/hooks/useChat";
import { useRouter } from "expo-router";
import React, { useRef } from "react";
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Image,
  Pressable,
  Text,
  View,
} from "react-native";
import ChatCard from "./ChatCard";
import ChatCardPlaceholder from "./ChatPlaceholder";
import HorizontalFilter from "./HorizontalFilter";

const OPTIONS = [
  "All",
  "Active",
  "Unread",
  "Expired",
  "Blocked",
  "Assigned",
  "Open",
  "Solved",
  "Pending",
  "Starred",
];

const Contacts = () => {
  const {
    chats,
    isLoading,
    totalChats,
    isFetchingNextPage,
    fetchNextPage,
    error,
    isError,
    onSearch,
    filter,
    setFilter,
  } = useChat();
  const router = useRouter();
  const animatedRef = useRef(new Animated.Value(0)).current;

  const hideHorizontalFilter = () => {
    Animated.spring(animatedRef, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <FlatList
      data={chats}
      keyExtractor={(item) => item?.id?.toString()}
      renderItem={({ item }) => <ChatCard data={item} />}
      ListHeaderComponent={() => (
        <View className="flex gap-4 mt-4">
          <Pressable
            className="flex flex-row items-center border border-gray-200 rounded-2xl bg-white p-4"
            onPress={() => router.push("searchChat")}
          >
            <Image
              source={icons.search as any}
              className="w-6 h-6 mr-1"
              tintColor={"gray"}
            />

            <Text className="text-lg font-JakartaSemiBold text-[#A3A3A3]">
              Search by name or contact
            </Text>
          </Pressable>

          {/*  Filter */}
          <HorizontalFilter
            defaultValue={filter}
            options={OPTIONS}
            onSelect={setFilter}
          />

          {/* Text */}
          {totalChats > 0 && (
            <Text className="text-lg font-JakartaSemiBold text-gray-700">
              Chats {totalChats}
            </Text>
          )}
        </View>
      )}
      ListEmptyComponent={() => (
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
      )}
      onEndReached={() => fetchNextPage()}
      ListFooterComponent={() => (
        <>
          {isFetchingNextPage && (
            <ActivityIndicator size={24} color="green" className="mt-3" />
          )}
        </>
      )}
      contentContainerStyle={{
        paddingHorizontal: 10,
        gap: 5,
        paddingBottom: 10,
      }}
      onScroll={(e) => {
        const offsetY = e.nativeEvent.contentOffset.y;
        if (offsetY > 50) {
          hideHorizontalFilter();
        } else {
          animatedRef.setValue(0);
        }
      }}
      scrollEventThrottle={16}
    />
  );
};

export default Contacts;
