import InputField from "@/components/input-field";
import Select from "@/components/Select";
import { icons } from "@/constants";
import useContactProfile from "@/hooks/useConatctProfile";
import { useChatStore } from "@/store/chat";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";

const submitAsOptions = ["Open", "Solved", "Pending"];

const ChatProfile = () => {
  const { selectedChat } = useChatStore();
  const router = useRouter();
  const { chatProfile, agentList, submitAs, assignAgent } = useContactProfile();


  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex flex-row items-center px-5 py-4 bg-white border-b border-gray-200 gap-3">
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-gray-100 rounded-full p-2"
        >
          <Image source={icons.moveLeft as any} className="w-5 h-5" />
        </TouchableOpacity>
        <Text className="text-xl font-JakartaSemiBold text-gray-800">
          Chat Profile
        </Text>
      </View>

      {/* Other Parts */}
      <View className="flex-1 bg-gray-100">
        <KeyboardAwareScrollView className="flex-1" bottomOffset={100}>
          <View className="flex-1 p-5">

            {/* Profile Card */}
            <View className="bg-white rounded-3xl elevation-sm p-6 mb-5">
              <View className="flex flex-row items-center gap-3">
                <View className="bg-emerald-50 rounded-full size-20 flex items-center justify-center ">
                  <Text className="font-JakartaBold text-3xl text-emerald-500">
                    {selectedChat?.formatted}
                  </Text>
                </View>
                <View className=" gap-1">
                  <Text className="text-2xl font-JakartaBold text-gray-800">
                    {selectedChat?.name}
                  </Text>
                  <View className="flex flex-row items-center gap-1">
                    <Image source={{ uri: chatProfile.data?.flag }} className="w-5 h-5" />
                    <Text className="text-base text-gray-500 font-Jakarta">
                      {selectedChat?.phone}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Submit As Section */}
            <View className="mb-5">
              <Text className="text-sm font-JakartaSemiBold text-gray-700 mb-3 px-1">
                Submit As
              </Text>
              <View className="bg-white rounded-2xl shadow-sm p-2">
                {submitAsOptions.map((option, index) => (
                  <TouchableOpacity
                    key={option}
                    onPress={() => submitAs.mutate({ submit_as: option })}
                    className={`flex-row items-center justify-between p-4 rounded-xl ${chatProfile.data?.submit_as === option
                      ? "bg-emerald-50"
                      : "bg-transparent"
                      } ${index !== submitAsOptions.length - 1 ? "border-b border-gray-100" : ""}`}
                  >
                    <Text
                      className={`font-JakartaMedium text-base ${chatProfile.data?.submit_as === option
                        ? "text-emerald-600"
                        : "text-gray-700"
                        }`}
                    >
                      {option}
                    </Text>
                    {chatProfile.data?.submit_as === option && (
                      <View className="bg-emerald-500 rounded-full size-5 flex items-center justify-center">
                        <Text className="text-white text-xs font-bold">✓</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <Select
              value={chatProfile.data?.assign_to?.toString()!}
              onValueChange={(value) => assignAgent.mutate({ agent_id: parseInt(value) })}
              options={agentList.data?.map((opt) => ({ value: opt.id.toString(), label: opt.name })) || []}
              placeholder="Select an option"
              label="Assigned To"
              modalTitle="Select an option"
            />

            <Text className="text-sm font-JakartaSemiBold mt-3">Tag</Text>
            <InputField
              containerStyle="rounded-xl"
              placeholder="#tag"
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ChatProfile;
