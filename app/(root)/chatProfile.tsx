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
  const [switchTagInput, setSwitchTagInput] = useState(false)
  const [note, setNote] = useState("")
  const { user } = useAuthStore()
  const router = useRouter();
  const { chatProfile, agentList, submitAs, assignAgent, createTag, getTags, createNote } = useContactProfile();

  if (chatProfile.isLoading) return <ChatProfilePlaceholder />

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white border-b border-gray-100">
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
      </View>

      {/* Other Parts */}
      <View className="flex-1">
        <KeyboardAwareScrollView className="flex-1" bottomOffset={100}>
          <View className="flex-1 p-5 gap-5">
            {/* Enhanced Profile Card */}
            <View className="bg-white rounded-3xl shadow-lg p-6 border border-emerald-100">
              <View className="flex flex-row items-center gap-4">
                <View className="bg-emerald-500 rounded-2xl size-20 flex items-center justify-center shadow-md">
                  <Text className="font-JakartaBold text-3xl text-white">
                    {selectedChat?.formatted}
                  </Text>
                </View>
                <View className="flex-1 gap-1.5">
                  <Text className="text-2xl font-JakartaBold text-gray-900">
                    {selectedChat?.name}
                  </Text>
                  <View className="flex flex-row items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full self-start">
                    <Image source={{ uri: chatProfile.data?.flag }} className="w-4 h-4" />
                    <Text className="text-sm text-gray-600 font-JakartaMedium">
                      {selectedChat?.phone}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* --------------Submit As------------- */}
            <View className="gap-2.5">
              <View className="flex flex-row items-center gap-2 px-1">
                <View className="w-1 h-4 bg-emerald-500 rounded-full" />
                <Text className="text-sm font-JakartaBold text-gray-800">
                  Submit As
                </Text>
              </View>

              {user?.role === "user" ? (
                <View className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                  {submitAsOptions.map((option, index) => (
                    <TouchableOpacity
                      key={option}
                      disabled={submitAs.isPending}
                      onPress={() => submitAs.mutate({ submit_as: option })}
                      className={`flex-row items-center justify-between p-4 ${chatProfile.data?.submit_as === option
                        ? "bg-emerald-50"
                        : "bg-white active:bg-gray-50"
                        } ${index !== submitAsOptions.length - 1 ? "border-b border-gray-50" : ""}`}
                    >
                      <Text
                        className={`font-JakartaSemiBold text-base ${chatProfile.data?.submit_as === option
                          ? "text-emerald-600"
                          : "text-gray-700"
                          }`}
                      >
                        {option}
                      </Text>
                      {chatProfile.data?.submit_as === option && (
                        <View className="bg-emerald-500 rounded-full size-6 flex items-center justify-center shadow-md">
                          <Text className="text-white text-xs font-bold">✓</Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              ) : (
                <View className="flex-row items-center justify-between p-4 rounded-2xl bg-white border-2 border-emerald-100 shadow-sm">
                  <Text className="font-JakartaSemiBold text-base text-gray-800">
                    {chatProfile.data?.submit_as}
                  </Text>
                  <View className="bg-emerald-500 rounded-full size-6 flex items-center justify-center shadow-md">
                    <Image source={icons.check as any} className="w-3.5 h-3.5" tintColor={'#fff'} />
                  </View>
                </View>
              )}
            </View>

            {/* --------------Assigned To------------- */}
            <View className="gap-2.5">
              <View className="flex flex-row items-center gap-2 px-1">
                <View className="w-1 h-4 bg-blue-500 rounded-full" />
                <Text className="text-sm font-JakartaBold text-gray-800">
                  Assigned To
                </Text>
              </View>

              {user?.role === "user" ? (
                <Select
                  value={chatProfile.data?.assign_to?.toString()!}
                  onValueChange={(value) => assignAgent.mutate({ agent_id: parseInt(value) })}
                  options={agentList.data?.map((opt) => ({ value: opt.id.toString(), label: opt.name })) || []}
                  placeholder={assignAgent.isPending ? "Assigning..." : "Select an option"}
                  label=""
                  modalTitle="Select an Agent"
                />
              ) : (
                chatProfile.data?.assign_to ? (
                  <View className="flex flex-row gap-3 items-center p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
                    <View className="size-12 rounded-xl bg-blue-100 flex items-center justify-center">
                      <Text className="font-JakartaBold text-lg text-blue-600">
                        {agentList.data?.find((agent) => agent?.id === parseInt(chatProfile.data?.assign_to!))?.name.charAt(0).toUpperCase()}
                      </Text>
                    </View>
                    <Text className="font-JakartaSemiBold text-gray-800 text-base">
                      {agentList.data?.find((agent) => agent?.id === parseInt(chatProfile.data?.assign_to!))?.name}
                    </Text>
                  </View>
                ) : (
                  <View className="flex flex-row gap-3 items-center p-4 bg-white border border-dashed border-gray-300 rounded-2xl">
                    <Image source={icons.failed as any} className="size-5" tintColor={'#9ca3af'} />
                    <Text className="text-gray-500 font-JakartaMedium">No Agent Assigned</Text>
                  </View>
                )
              )}
            </View>

            {/* --------------Tag------------- (Only for users) */}
            {user?.role === "user" && (
              <>
                <View className="gap-2.5">
                  <View className="flex flex-row items-center gap-2 px-1">
                    <View className="w-1 h-4 bg-purple-500 rounded-full" />
                    <Text className="text-sm font-JakartaBold text-gray-800">Tag</Text>
                  </View>
                  {switchTagInput ?
                    (
                      <View className="flex flex-row items-center px-4 gap-3 border-2 bg-white border-gray-100 rounded-2xl shadow-sm">
                        <Image source={icons.tag as any} className="w-5 h-5" tintColor={"#9333ea"} />
                        <TextInput
                          value={tag}
                          onChangeText={(text) => setTag(text)}
                          placeholder="Add a tag"
                          placeholderTextColor="#9ca3af"
                          className="flex-1 rounded-xl py-4 font-JakartaMedium"
                          maxLength={100}
                        />
                        {createTag.isPending ? (
                          <ActivityIndicator color={'#10b981'} />
                        ) : (
                          <TouchableOpacity
                            onPress={() => createTag.mutate({ name: tag }, { onSuccess: () => setTag("") })}
                            disabled={!tag}
                            className={`${!tag && 'opacity-40'}`}
                          >
                            <View className="bg-emerald-500 rounded-xl p-2 shadow-md">
                              <Image
                                source={icons.add as any}
                                className="size-5"
                                tintColor={"#fff"}
                              />
                            </View>
                          </TouchableOpacity>
                        )}
                      </View>
                    ) : (
                      <Select
                        value={tag}
                        options={getTags.data?.map((tag) => ({ value: `${tag.id}+${tag.name}`, label: tag.name })) || []}
                        onValueChange={(value) => {
                          setTag(value)
                          createTag.mutate({ name: value.split('+')[1] }, { onSuccess: () => setTag("") })
                        }}
                      />
                    )}

                  <TouchableOpacity
                    onPress={() => {
                      setTag("")
                      setSwitchTagInput(!switchTagInput)
                    }}
                    className="flex flex-row justify-end"
                  >
                    <Text className="text-sm font-JakartaSemiBold text-emerald-600 text-end">
                      {!switchTagInput ? "custom tag" : "select a tag"}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* --------------Tag List------------- */}
                {chatProfile.data?.tag.length! > 0 && (
                  <View className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm max-h-80">
                    <ScrollView
                      nestedScrollEnabled={true}
                      showsVerticalScrollIndicator={true}
                    >
                      {chatProfile.data?.tag.map((tag, index) => (
                        <View
                          key={tag.id}
                          className={`flex flex-col gap-2 p-3.5 ${index !== chatProfile.data?.tag.length! - 1 ? 'border-b border-gray-50' : ''
                            }`}
                        >
                          <View className="flex flex-row items-center gap-3">
                            <View className="bg-purple-50 rounded-xl size-11 flex items-center justify-center">
                              <Image source={icons.tag as any} className="w-5 h-5" tintColor={"#9333ea"} />
                            </View>
                            <Text className="text-gray-700 text-base flex-1 font-JakartaMedium">
                              {tag.name}
                            </Text>
                          </View>
                          <View className="flex flex-row justify-end">
                            <Text className="text-xs text-gray-500 font-JakartaMedium py-1.5 px-3 bg-gray-50 rounded-xl">
                              {new Date(tag.created_at).toLocaleTimeString([], {
                                day: "numeric",
                                month: "short",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </Text>
                          </View>
                        </View>
                      ))}
                    </ScrollView>
                  </View>
                )}
              </>
            )}

            {/* --------------Note------------- (Only for users) */}
            {user?.role === "user" && (
              <>
                <View className="gap-2.5">
                  <View className="flex flex-row items-center gap-2 px-1">
                    <View className="w-1 h-4 bg-amber-500 rounded-full" />
                    <Text className="text-sm font-JakartaBold text-gray-800">Note</Text>
                  </View>
                  <View className="flex flex-row px-4 py-2 border-2 bg-white border-gray-100 rounded-2xl shadow-sm">
                    <View className="mr-3 mt-3">
                      <Image source={icons.note as any} className="w-5 h-5" tintColor={"#f59e0b"} />
                    </View>
                    <TextInput
                      placeholder="Add a note"
                      placeholderTextColor="#9ca3af"
                      multiline
                      numberOfLines={5}
                      className="flex-1 rounded-xl py-3 min-h-28 font-JakartaMedium"
                      style={{ textAlignVertical: "top" }}
                      value={note}
                      onChangeText={(text) => setNote(text)}
                      maxLength={500}
                    />
                    {createNote.isPending ? (
                      <ActivityIndicator color={'#10b981'} className="mt-auto mb-2 ml-2" />
                    ) : (
                      <TouchableOpacity
                        disabled={!note}
                        className={`mt-auto mb-2 ml-2 ${!note && 'opacity-40'}`}
                        onPress={() => createNote.mutate({ note }, { onSuccess: () => setNote("") })}
                      >
                        <View className="bg-emerald-500 rounded-xl p-2 shadow-md">
                          <Image
                            source={icons.add as any}
                            className="size-5"
                            tintColor={"#fff"}
                          />
                        </View>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>

                {/* --------------Note List------------- */}
                {chatProfile.data?.note.length! > 0 && (
                  <View className="gap-3">
                    {chatProfile.data?.note.map((note, index) => (
                      <View
                        key={note.id}
                        className="bg-white rounded-2xl border border-amber-100 shadow-sm p-4"
                      >
                        <View className="flex flex-row items-start gap-3 mb-3">
                          <View className="bg-amber-50 rounded-xl size-11 flex items-center justify-center">
                            <Image source={icons.note as any} className="w-5 h-5" tintColor={"#f59e0b"} />
                          </View>
                          <View className="flex-1">
                            <Text className="text-xs text-gray-500 font-JakartaMedium py-1.5 px-3 bg-amber-50 rounded-xl self-start">
                              {new Date(note.created_at).toLocaleTimeString([], {
                                day: "numeric",
                                month: "short",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </Text>
                          </View>
                        </View>
                        <Text className="text-gray-700 text-base font-JakartaMedium leading-6 px-1">
                          {note.text}
                        </Text>
                      </View>
                    ))}
                  </View>
                )}
              </>
            )}

          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ChatProfile;