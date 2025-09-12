import Contacts from "@/components/contacts";
import { icons } from "@/constants";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const Chats = () => {
  const { user } = useAuthStore();
  const router = useRouter();
  return (
    <View className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="pb-4 bg-green-500 pt-10 px-5 relative">
        <View className="flex flex-row items-center justify-between gap-2">
          <Text className="text-2xl font-JakartaBold text-white">
            {user?.company}
          </Text>
          {/* User Avatar */}
          <TouchableOpacity onPress={() => router.push("/profile")}>
            <Image source={icons.avatar as any} className="w-10 h-10" />
          </TouchableOpacity>
        </View>
      </View>

      {/* List of chats */}
      <Contacts />
    </View>
  );
};

export default Chats;
