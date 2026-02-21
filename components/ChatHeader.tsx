import { icons } from "@/constants";
import React from "react";
import { Image, Text, TextInput, View } from "react-native";
import HorizontalFilter from "./HorizontalFilter";


interface ChatsHeaderProps {
    filter: string;
    totalChats?: number;
    setFilter: (value: string) => void;
    serach: string
    onSearch: (value: string) => void
    options: string[]
    info?: string
}

const ChatsHeader: React.FC<ChatsHeaderProps> = React.memo(
    ({ filter, setFilter, totalChats, options, serach, onSearch, info }) => {
        return (
            <View className="flex gap-4 mt-4 pb-2">
                <View className="flex px-4 gap-2 flex-row mb-4 mt-2 items-center  border border-gray-200 rounded-2xl bg-gray-100">
                    <Image source={icons.search as any} className="w-6 h-6" />
                    <TextInput
                        placeholder="Search by name or contact"
                        placeholderTextColor={"#A3A3A3"}
                        className="py-3.5 flex-1 text-lg"
                        onChangeText={onSearch}
                    />
                </View>
                <HorizontalFilter
                    defaultValue={filter}
                    options={options}
                    onSelect={setFilter}
                />
                {/* Chats count */}
                {
                    totalChats! > 0 && (
                        <Text className="font-JakartaSemiBold text-gray-700">
                            {info ? info : "Chats"} {totalChats}
                        </Text>
                    )
                }
            </View>
        )
    }
);

// Set displayName to remove ESLint warning
ChatsHeader.displayName = "ChatsHeader";

export default ChatsHeader;
