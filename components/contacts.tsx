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

const chats = [
  {
    id: 437038,
    name: "Ankita",
    phone: "919044200277",
    formatted: "A",
    status: "Active",
    unread_count: 5,
    last_message: "Our Services",
    last_chat: "17:11 PM",
    is_starred: "",
  },
  {
    id: 437039,
    name: "Saumya",
    phone: "919044200277",
    formatted: "S",
    status: "Expired",
    unread_count: 0,
    last_message:
      "What is the price of your services , please can you let me know i want to purchase your service",
    last_chat: "17:11 PM",
    is_starred: "",
  },
  {
    id: 437040,
    name: "Naushad Shah",
    phone: "919044200277",
    formatted: "NS",
    status: "Active",
    unread_count: 0,
    last_message: "Everything is fine what you will say ?",
    last_chat: "17:11 PM",
    is_starred: "",
  },
  {
    id: 437041,
    name: "Waquar Khan",
    phone: "919044200277",
    formatted: "WK",
    status: "Expired",
    unread_count: 10,
    last_message: "Everything is fine what you will say ?",
    last_chat: "17:11 PM",
    is_starred: "",
  },
  {
    id: 437042,
    name: "Faizan Khan",
    phone: "919044200277",
    formatted: "FK",
    status: "Expired",
    unread_count: 10,
    last_message: "Everything is fine what you will say ?",
    last_chat: "17:11 PM",
    is_starred: "",
  },
  {
    id: 437043,
    name: "Nafees Khan",
    phone: "919044200277",
    formatted: "NK",
    status: "Expired",
    unread_count: 10,
    last_message: "Everything is fine what you will say ?",
    last_chat: "17:11 PM",
    is_starred: "",
  },
  {
    id: 437044,
    name: "Zeeshan Khan",
    phone: "919044200277",
    formatted: "ZK",
    status: "Active",
    unread_count: 10,
    last_message: "Everything is fine what you will say ?",
    last_chat: "17:11 PM",
    is_starred: "",
  },
];

const Contacts = () => {
  const { onSearch } = useChat();

  return (
    <FlatList
      data={chats}
      keyExtractor={(item) => item.id.toString()}
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
            onSelect={(value) => console.log(value)}
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
