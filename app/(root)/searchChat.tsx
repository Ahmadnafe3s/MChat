import ChatCard from "@/components/ChatCard";
import ChatCardPlaceholder from "@/components/ChatPlaceholder";
import { icons, images } from "@/constants";
import useChat from "@/hooks/useChat";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SearchChat = () => {
  const { chats, onSearch, isLoading, error, isError } = useChat();
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 px-[10px]">
      {/* Header */}
      <View className="flex px-4 gap-2 flex-row mb-4 mt-2 items-center  border border-gray-200 rounded-2xl bg-white">
        <TouchableOpacity onPress={() => router.back()}>
          <Image source={icons.moveLeft as any} className="w-6 h-6" />
        </TouchableOpacity>
        <TextInput
          placeholder="Search by name or contact"
          placeholderTextColor={"#A3A3A3"}
          autoFocus={true}
          className="py-4 flex-1 text-lg"
        />
      </View>

      {/* List of chats */}
      <FlatList
        data={chats}
        keyExtractor={(item) => item?.id?.toString()}
        renderItem={({ item }) => <ChatCard data={item} />}
        ListEmptyComponent={() => (
          <View className="mt-4">
            {isLoading ? (
              <View className="flex gap-[6px]">
                {Array.from({ length: 10 }, (_, i) => (
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
        contentContainerStyle={{
          gap: 5,
          paddingBottom: 10,
        }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default SearchChat;
