import Contacts from "@/components/contacts";
import { icons } from "@/constants";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

const Chats = () => {
  const { user } = useAuthStore();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View
        style={{ paddingTop: insets.top + 24 , marginTop: -insets.top - 16 }}
        className="pb-4 px-5 bg-emerald-400"
      >
        <View className="flex flex-row items-center justify-between gap-2 ">
          <Text className="text-2xl font-JakartaBold text-white flex-shrink" numberOfLines={1}>
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
