import Contacts from "@/components/contacts";
import { useAuthStore } from "@/store/auth";
import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { Image, NativeScrollEvent, NativeSyntheticEvent, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Chats = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user } = useAuthStore();
  const flashListRef = useRef<FlashList<any>>(null);
  const [showScrollUp, setShowScrollUp] = useState(false);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setShowScrollUp(offsetY > 300);
  };

  const scrollToTop = () => {
    flashListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };



  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View
        style={{ paddingTop: insets.top + 12 }}
        className="bg-emerald-600 px-5 pb-6 rounded-b-[40px] shadow-lg mb-4"
      >
        <View className="flex flex-row items-center justify-between gap-2">
          <Text className="text-2xl font-JakartaBold text-white flex-shrink" numberOfLines={1}>
            Muzztech
          </Text>
          {/* User Avatar */}
          <TouchableOpacity onPress={() => router.push("/profile")}>
            <Image source={{ uri: user?.company_logo }} className="w-12 h-12 rounded-full border-2 border-white/20" style={{ resizeMode: 'contain' }} />
          </TouchableOpacity>
        </View>
      </View>

      {/* List of chats */}
      <View className="flex-1">
        <Contacts ref={flashListRef} onScroll={handleScroll} />
      </View>

      {/* Auto Scroll Up Button */}
      {showScrollUp && (
        <TouchableOpacity
          onPress={scrollToTop}
          activeOpacity={0.8}
          className="absolute bottom-6 right-6 bg-emerald-600 w-12 h-12 rounded-full items-center justify-center shadow-2xl z-50 border border-white/20"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 4.65,
            elevation: 8,
          }}
        >
          <Ionicons name="chevron-up" size={28} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Chats;
