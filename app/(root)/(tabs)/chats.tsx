import Contacts from "@/components/contacts";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Chats = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user } = useAuthStore();



  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View
        style={{ paddingTop: insets.top + 12 }}
        className="bg-emerald-500 px-5 pb-6 rounded-b-[40px] shadow-lg mb-4"
      >
        <View className="flex flex-row items-center justify-between gap-2">
          <Text className="text-2xl font-JakartaBold text-white flex-shrink" numberOfLines={1}>
            Muzztech
          </Text>
          {/* User Avatar */}
          <TouchableOpacity onPress={() => router.push("/profile")}>
            <Image source={{ uri: user?.company_logo }} className="w-10 h-10 rounded-full border-2 border-white/20" style={{ resizeMode: 'contain' }} />
          </TouchableOpacity>
        </View>
      </View>

      {/* List of chats */}
      <View className="flex-1">
        <Contacts />
      </View>
    </View>
  );
};

export default Chats;
