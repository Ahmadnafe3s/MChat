import { icons } from "@/constants";
import useChat from "@/hooks/useChat";
import { useChatStore } from "@/store/chat";
import { useToastStore } from "@/store/toast";
import { useRouter } from "expo-router";
import React, { memo } from "react";
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from "react-native";
import Dropdown from "./Dropdown";

interface Props {
  onCall: () => void,
  onClearChat: () => void
}

const ConversationHeader = memo(({ onCall, onClearChat }: Props) => {

  const router = useRouter();
  const { selectedChat } = useChatStore();
  const { starredChat, blockChat } = useChat();
  const { showToast } = useToastStore()

  const handleSelect = (value: string) => {
    switch (value) {
      case "Block":
      case "Unblock":
        blockChat.mutate();
        break;
      case "Clear Chat":
        onClearChat()
        break;
      case "Profile":
        router.push(`/(root)/chatProfile`);
        break;
      case "Media":
        router.push(`/(root)/allMedia`);
        break;
    }
  };



  return (
    <>
      <View className="w-full flex flex-row px-4 pb-3 items-center justify-between bg-white mt-1 border-b border-gray-200">
        {/* Flex 1 */}
        <View className="flex-1 flex flex-row gap-2 items-center">
          <TouchableOpacity onPress={() => router.back()}>
            <Image source={icons.moveLeft as any} className="w-6 h-6" />
          </TouchableOpacity>
          <View className="bg-emerald-100 rounded-full size-12 flex items-center justify-center">
            <Text className="font-JakartaSemiBold text-2xl text-emerald-500">
              {selectedChat?.formatted}
            </Text>
          </View>
          <TouchableOpacity className="flex flex-1"
            onPress={() => router.push(`/(root)/chatProfile`)}
          >
            <Text
              className="text-lg  text-neutral-700 font-Jakarta mr-2"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {selectedChat?.name}
            </Text>
          </TouchableOpacity>
        </View>


        {/* Flex 2 */}
        <View className="flex flex-row items-center gap-4">
          <TouchableOpacity onPress={() => starredChat.mutate()}>
            {starredChat.isPending ? (
              <ActivityIndicator size="small" color="gray" />
            ) : (
              <Image
                source={selectedChat?.is_starred === "Starred" ? icons.star_filled : icons.star as any}
                className="w-6 h-6"
                tintColor={"#ffbb00"}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={onCall}>
            <Image
              source={icons.dialer as any}
              className="w-6 h-6"
              tintColor={"#10b981"}
            />
          </TouchableOpacity>
          <Dropdown
            options={["Media", "Clear Chat", selectedChat?.status === "Blocked" ? "Unblock" : "Block", "Profile"]}
            icon={icons.more as any}
            iconStyle={{ width: 20, height: 20 }}
            iconBgStyle="bg-white"
            onSelect={handleSelect}
          />
        </View>
      </View>
    </>
  );
});

ConversationHeader.displayName = "ConversationHeader";

export default ConversationHeader;
