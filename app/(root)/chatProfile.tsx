import ChatProfilePlaceholder from "@/components/ChatProfilePlaceholder";
import Select from "@/components/Select";
import { icons } from "@/constants";
import useContactProfile from "@/hooks/useConatctProfile";
import { useAuthStore } from "@/store/auth";
import { useChatStore } from "@/store/chat";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";

const submitAsOptions = ["Open", "Solved", "Pending"];

const ChatProfile = () => {
  const { selectedChat } = useChatStore();
  const [tag, setTag] = useState("")
  const [note, setNote] = useState("")
  const { user } = useAuthStore()
  const router = useRouter();
  const { chatProfile, agentList, submitAs, assignAgent, createTag, createNote } = useContactProfile();


  if (chatProfile.isLoading) return <ChatProfilePlaceholder />


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
          <View className="flex-1 p-5 gap-3">
            {/* Profile Card */}
            <View className="bg-white rounded-3xl elevation-sm p-6">
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

            {/* --------------Submit As------------- */}
            <Text className="text-sm font-JakartaSemiBold text-gray-700 px-1">
              Submit As
            </Text>

            {
              //  ----------------If role is user, show the select component ----------------
              user?.role === "user" ? (
                <View className="bg-white rounded-2xl shadow-sm p-2">
                  {submitAsOptions.map((option, index) => (
                    <TouchableOpacity
                      key={option}
                      disabled={submitAs.isPending}
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
              ) : (
                <View
                  className={`flex-row items-center justify-between p-4 rounded-xl bg-white border border-gray-200`}
                >
                  <Text
                    className={`font-JakartaMedium text-base `}
                  >
                    {chatProfile.data?.submit_as}
                  </Text>
                  <View className="bg-emerald-500 rounded-full size-5 flex items-center justify-center">
                    <Image source={icons.check as any} className="w-3 h-3" tintColor={'#fff'} />
                  </View>
                </View>
              )
            }

            {/* --------------Assigned To------------- */}

            {
              //  ----------------If role is user, show the select component ----------------
              user?.role === "user" ? (
                <Select
                  value={chatProfile.data?.assign_to?.toString()!}
                  onValueChange={(value) => assignAgent.mutate({ agent_id: parseInt(value) })}
                  options={agentList.data?.map((opt) => ({ value: opt.id.toString(), label: opt.name })) || []}
                  placeholder={assignAgent.isPending ? "Assigning..." : "Select an option"}
                  label="Assigned To"
                  modalTitle="Select an option"
                />
              ) : (
                <View className="flex gap-3">
                  <Text className="text-sm font-JakartaSemiBold">Assigned To</Text>
                  {/* ------Checking if the agent is assigned to the chat or not------- */}
                  {chatProfile.data?.assign_to ? (
                    <View className="flex flex-row gap-2 items-center p-2 bg-white border border-gray-200 rounded-xl">
                      <View className="size-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <Text className="font-JakartaBold text-base text-gray-600">
                          {agentList.data?.find((agent) => agent?.id === parseInt(chatProfile.data?.assign_to!))?.name.charAt(0).toUpperCase()}
                        </Text>
                      </View>
                      <Text>
                        {agentList.data?.find((agent) => agent?.id === parseInt(chatProfile.data?.assign_to!))?.name}
                      </Text>
                    </View>
                  ) : (
                    <View className="flex flex-row gap-2 items-center p-4 bg-white border border-gray-200 rounded-xl">
                      <Image source={icons.failed as any} className="size-5" tintColor={'#737373'} />
                      <Text className="text-neutral-500">No Agent Assigned</Text>
                    </View>
                  )}
                </View>
              )
            }

            {/* --------------Tag------------- */}
            <Text className="text-sm font-JakartaSemiBold">Tag</Text>
            <View className="flex flex-row items-center px-4 gap-2 border bg-white border-gray-200 rounded-xl">
              <TextInput
                value={tag}
                onChangeText={(text) => setTag(text)}
                placeholder="Add a tag"
                className="flex-1 rounded-xl py-4"
              />
              {
                createTag.isPending ?
                  (
                    <ActivityIndicator color={'#42d6a6'} />
                  ) : (
                    <TouchableOpacity
                      onPress={() => createTag.mutate({ name: tag }, { onSuccess: () => setTag("") })}
                      disabled={!tag}
                    >
                      <Image
                        source={icons.add as any}
                        className="size-8"
                        tintColor={"#42d6a6"}
                      />
                    </TouchableOpacity>
                  )
              }
            </View>

            {/* --------------Tag List------------- */}
            {chatProfile.data?.tag.length! > 0 && (
              <View className="bg-white rounded-2xl border border-gray-200 overflow-hidden max-h-80">
                <ScrollView
                  nestedScrollEnabled={true}
                  showsVerticalScrollIndicator={true}
                >
                  {chatProfile.data?.tag.map((tag, index) => (
                    <View
                      key={tag.id}
                      className={`flex flex-row items-center gap-3 p-2.5 ${index !== chatProfile.data?.tag.length! - 1 ? 'border-b border-gray-100' : ''
                        }`}
                    >
                      <View className="bg-gray-100 rounded-full size-10 flex items-center justify-center">
                        <Image source={icons.tag as any} className="w-5 h-5" tintColor={"#374151"} />
                      </View>
                      <Text className="text-gray-600 text-lg flex-1" numberOfLines={1}>
                        {tag.name}
                      </Text>
                      <Text className="text-xs text-gray-400 font-Jakarta py-1 px-2 bg-gray-100 rounded-2xl border border-gray-200">
                        {new Date(tag.created_at).toLocaleTimeString([], {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </Text>
                    </View>
                  ))}
                </ScrollView>
              </View>
            )}

            {/* --------------Note------------- */}

            <Text className="text-sm font-JakartaSemiBold">Note</Text>
            <View className="flex flex-row  px-4  border bg-white mb-2 border-gray-200 rounded-xl">
              <TextInput
                placeholder="Add a note"
                multiline
                numberOfLines={5}
                className="flex-1 rounded-xl py-4 min-h-28"
                style={{ textAlignVertical: "top" }}
                value={note}
                onChangeText={(text) => setNote(text)}
              />
              {
                createNote.isPending ?
                  (
                    <ActivityIndicator color={'#42d6a6'} className="mt-auto mb-2" />
                  ) : (
                    <TouchableOpacity
                      disabled={!note}
                      className="mt-auto mb-2"
                      onPress={() => createNote.mutate({ note }, { onSuccess: () => setNote("") })}
                    >
                      <Image
                        source={icons.add as any}
                        className="size-8"
                        tintColor={"#42d6a6"}
                      />
                    </TouchableOpacity>
                  )
              }
            </View>

            {/* --------------Note List------------- */}
            {chatProfile.data?.note.length! > 0 && (
              <View className="bg-white rounded-2xl border border-gray-200 overflow-hidden max-h-80">
                <ScrollView
                  nestedScrollEnabled={true}
                  showsVerticalScrollIndicator={true}
                >
                  {chatProfile.data?.note.map((note, index) => (
                    <View
                      key={note.id}
                      className={`flex flex-row items-center gap-3 p-2.5 ${index !== chatProfile.data?.note.length! - 1 ? 'border-b border-gray-100' : ''
                        }`}
                    >
                      <View className="bg-gray-100 rounded-full size-10 flex items-center justify-center">
                        <Image source={icons.note as any} className="w-5 h-5" tintColor={"#374151"} />
                      </View>
                      <Text className="text-gray-600 text-lg flex-1" numberOfLines={1}>
                        {note.text}
                      </Text>
                      <Text className="text-xs text-gray-400 font-Jakarta py-1 px-2 bg-gray-100 rounded-2xl border border-gray-200">
                        {new Date(note.created_at).toLocaleTimeString([], {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </Text>
                    </View>
                  ))}
                </ScrollView>
              </View>
            )}

          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ChatProfile;
