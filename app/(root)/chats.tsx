import Contacts from "@/components/contacts";
import useChat from "@/hooks/useChat";
import { useAuthStore } from "@/store/auth";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Chats = () => {
  const { user } = useAuthStore();
  const arrayedName = user?.name?.split(" ");
  const { onSearch } = useChat();

  return (
    <View className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="pb-5 bg-green-500 pt-12 px-5 relative">
        <View className="flex flex-row items-center justify-between gap-2">
          <Text className="text-2xl font-JakartaBold text-white">
            {user?.company}
          </Text>
          {/* User Avatar */}
          <TouchableOpacity className="bg-white rounded-full size-12 flex items-center justify-center">
            <Text className="font-JakartaBold text-2xl uppercase text-green-600">
              {arrayedName?.[0]?.charAt(0)}
              {arrayedName?.[1]?.charAt(0)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* List of chats */}
      <Contacts />
    </View>
  );
};

export default Chats;
