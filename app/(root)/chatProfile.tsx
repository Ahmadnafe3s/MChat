import ChatProfilePlaceholder from "@/components/ChatProfilePlaceholder";
import AssignedToSection from "@/components/contactProfile/AssignedToSection";
import NoteSection from "@/components/contactProfile/NoteSection";
import ProfileCard from "@/components/contactProfile/ProfileCard";
import SubmitAsSection from "@/components/contactProfile/SubmitAsSection";
import TagSection from "@/components/contactProfile/TagSection";
import { icons } from "@/constants";
import useContactProfile from "@/hooks/useConatctProfile";
import { useAuthStore } from "@/store/auth";
import { useChatStore } from "@/store/chat";
import { useToastStore } from "@/store/toast";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";

const ChatProfile = () => {
  const { selectedChat } = useChatStore();
  const { user } = useAuthStore();
  const { showToast } = useToastStore()
  const router = useRouter();
  const [selectedTags, setSelectedTag] = useState<Set<number>>(new Set());
  const { chatProfile, agentList, submitAs, assignAgent, createTag, getTags, createNote, deleteTag } = useContactProfile();

  const handleDeleteTag = () => {
    const tags = [...selectedTags.values()];
    const tagIds = tags.join(",");
    deleteTag.mutate({ tag_id: tagIds }, {
      onSuccess: () => {
        setSelectedTag(new Set());
        showToast("Tag deleted successfully", "success")
      }
    });
  };

  const handleTagLongPress = (tagId: number) => {
    setSelectedTag((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(tagId)) {
        newSet.delete(tagId);
      } else {
        newSet.add(tagId);
      }
      return newSet;
    });
  };

  const handleTagPress = (tagId: number) => {
    if (selectedTags.size > 0) {
      handleTagLongPress(tagId);
    } else {
      // Other operations
    }
  };

  if (chatProfile.isLoading) return <ChatProfilePlaceholder />;

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white border-b border-gray-100">
        <View className="flex flex-row items-center justify-between mr-3">
          <View className="flex flex-row items-center px-5 py-4 gap-3">
            <TouchableOpacity
              onPress={() => router.back()}
              className="bg-emerald-50 rounded-xl p-2.5 active:bg-emerald-100"
            >
              <Image source={icons.moveLeft as any} className="w-5 h-5" tintColor="#10b981" />
            </TouchableOpacity>
            <Text className="text-xl font-JakartaBold text-gray-900">
              Chat Profile
            </Text>
          </View>
          {selectedTags.size > 0 && (
            <TouchableOpacity
              onPress={handleDeleteTag}
              className="p-2.5 bg-red-50 rounded-md flex flex-row items-center gap-1">
              <Ionicons name="trash" size={16} color="#ef4444" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Content */}
      <View className="flex-1">
        <KeyboardAwareScrollView className="flex-1" bottomOffset={100}>
          <View className="flex-1 p-5 gap-5">
            <ProfileCard
              formatted={selectedChat?.formatted}
              name={selectedChat?.name}
              phone={selectedChat?.phone}
              flag={chatProfile.data?.flag}
            />

            <SubmitAsSection
              role={user?.role}
              currentValue={chatProfile.data?.submit_as}
              submitAs={submitAs}
            />

            <AssignedToSection
              role={user?.role}
              assignTo={chatProfile.data?.assign_to}
              agentList={agentList}
              assignAgent={assignAgent}
            />

            {user?.role === "user" && (
              <TagSection
                tags={chatProfile.data?.tag || []}
                selectedTags={selectedTags}
                onTagLongPress={handleTagLongPress}
                onTagPress={handleTagPress}
                createTag={createTag}
                getTags={getTags}
              />
            )}

            {user?.role === "user" && (
              <NoteSection
                notes={chatProfile.data?.note || []}
                createNote={createNote}
              />
            )}
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ChatProfile;