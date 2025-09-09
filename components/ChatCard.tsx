import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const ChatCard = ({ data }: { data: Chat}) => {
  return (
    <TouchableOpacity className="bg-white px-4 py-4 flex flex-row items-center gap-2 rounded-2xl">
      <View className="bg-green-100 rounded-full size-[50px] flex items-center justify-center">
        <Text className="font-JakartaSemiBold text-2xl uppercase text-green-500">
          {data.formatted}
        </Text>
      </View>

      <View className="flex flex-1">
        <Text className="text-xl font-JakartaSemiBold text-gray-600">
          {data?.name}
        </Text>
        <Text
          numberOfLines={1}
          className="text-neutral-400 mr-5 font-JakartaSemiBold"
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
          <Text className="bg-green-500 px-2 py-1 rounded-full text-white">
            {data?.unread_count}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ChatCard;
