import { icons, images } from "@/constants";
import useChat from "@/hooks/useChat";
import React from "react";
import { FlatList, Image, Text, TextInput, View } from "react-native";
import ChatCard from "./ChatCard";
import HorizontalFilter from "./HorizontalFilter";

const OPTIONS = [
  "All",
  "Active",
  "Unread",
  "Expired",
  "Blocked",
  "Assigned",
  "Open",
  "Solved",
  "Pending",
  "Starred",
];


const Contacts = () => {
  const { chats, onSearch } = useChat();

  return (
    <FlatList
      data={chats}
      keyExtractor={(item) => item?.id?.toString()}
      renderItem={({ item }) => <ChatCard data={item} />}
      ListHeaderComponent={() => (
        <View className="flex gap-4">
          <View className="flex flex-row items-center border border-gray-200 rounded-2xl bg-white px-4">
            <Image
              source={icons.search as any}
              className="w-6 h-6 mr-1"
              tintColor={"gray"}
            />
            <TextInput
              placeholder="Search by name or contact"
              placeholderTextColor={"#A3A3A3"}
              className="py-3 flex-1 text-lg font-JakartaSemiBold"
              onChangeText={onSearch}
            />
          </View>

          <HorizontalFilter
            defaultValue="Active"
            options={OPTIONS}
            onSelect={onSearch}
          />

          {/* Text */}
          {chats.length > 0 && (
            <Text className="text-lg font-JakartaSemiBold text-gray-700">
              Chats {chats.length}
            </Text>
          )}
        </View>
      )}
      ListEmptyComponent={() => (
        <>
          {true && (
            <View>
              <Image
                source={images.empty as any}
                className="h-[300px] w-full"
              />
              <Text className="text-neutral-400 text-lg font-Jakarta text-center">
                Sorry! we could not find any chats
              </Text>
            </View>
          )}
        </>
      )}
      contentContainerStyle={{
        paddingHorizontal: 10,
        gap: 5,
        paddingBottom: 40,
      }}
    />
  );
};

export default Contacts;
