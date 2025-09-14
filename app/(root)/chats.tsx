import Contacts from "@/components/contacts";
import { icons } from "@/constants";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Chats = () => {
  const { user } = useAuthStore();
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-green-500">
      {/* Header */}
      <View className="pb-4 px-5 relative pt-4">
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
    </SafeAreaView>
  );
};

export default Chats;
