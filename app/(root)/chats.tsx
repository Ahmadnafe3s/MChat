import Contacts from "@/components/contacts";
import { useAuthStore } from "@/store/auth";
import React from "react";
import { Text, View } from "react-native";

const Chats = () => {
  const { user } = useAuthStore();
  const arrayedName = user?.name?.split(" ");
  return (
    <View className="flex-1 bg-gray-100 gap-4">
      {/* Header */}
      <View className="pb-5 bg-green-500 pt-12 px-5">
        {/* User Avatar */}
        <View className="flex flex-row items-center gap-2">
          <View className="bg-white rounded-full size-12 flex items-center justify-center">
            <Text className="font-JakartaBold text-2xl uppercase text-green-600">
              {arrayedName?.[0]?.charAt(0)}
              {arrayedName?.[1]?.charAt(0)}
            </Text>
          </View>
          <Text className="text-white text-xl font-JakartaSemiBold">
            {user?.name}
          </Text>
        </View>
      </View>
      {/* List of chats */}
      <Contacts filter="Active" />
    </View>
  );
};

export default Chats;
