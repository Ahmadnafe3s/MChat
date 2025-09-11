import { useChatStore } from "@/store/chat";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const ChatCard = ({ data }: { data: Chat }) => {
  const router = useRouter();
  const { setSelectedChat } = useChatStore();

  const handleSelect = () => {
    setSelectedChat(data);
    router.push(`/(root)/conversation`);
  };

  return (
    <TouchableOpacity className="bg-white px-4 py-4 flex flex-row items-center gap-2 rounded-2xl" onPress={handleSelect}>
      <View className="bg-green-100 rounded-full size-[45px] flex items-center justify-center">
        <Text className="font-JakartaSemiBold text-xl uppercase text-green-500">
          {data?.formatted}
        </Text>
      </View>

      <View className="flex flex-1">
        <Text className=" font-JakartaSemiBold text-gray-600 mr-2" numberOfLines={1}>
          {data?.name}
        </Text>
        <Text
          numberOfLines={1}
          className="text-neutral-400 mr-5 font-Jakarta"
        >
          {data?.last_message}
        </Text>
        <Text
          className={`text-sm py-0.5 px-1 rounded-full text-center mt-1 max-w-16 ${data?.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}
        >
          {data?.status}
        </Text>
      </View>

      <View className="flex items-center gap-2">
        <Text className="text-neutral-400 text-sm font-JakartaBold">
          {data?.last_chat}
        </Text>
        {data?.unread_count > 0 && (
          <View className="size-6 rounded-full bg-green-500 items-center justify-center">
            <Text className="text-sm text-white">
              {data?.unread_count}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ChatCard;
