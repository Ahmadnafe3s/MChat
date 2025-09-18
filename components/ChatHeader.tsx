import { icons } from "@/constants";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import HorizontalFilter from "./HorizontalFilter";

const OPTIONS = [
    "All", "Active", "Unread", "Expired", "Blocked",
    "Assigned", "Open", "Solved", "Pending", "Starred"
];

interface ChatsHeaderProps {
    filter: string;
    totalChats?: number;
    setFilter: (value: string) => void;
}

const ChatsHeader: React.FC<ChatsHeaderProps> = React.memo(
    ({ filter, setFilter, totalChats }) => {
        const router = useRouter();
        return (
            <View className="flex gap-4 mt-4 pb-2">
                <Pressable
                    className="flex flex-row items-center border border-gray-200 rounded-2xl bg-gray-100 p-3.5"
                    onPress={() => router.push("/(root)/searchChat")}
                >
                    <Image
                        source={icons.search as any}
                        className="w-6 h-6 mr-1"
                        tintColor={"gray"}
                    />
                    <Text className="text-lg font-JakartaSemiBold text-[#A3A3A3]">
                        Search by name or contact
                    </Text>
                </Pressable>
                <HorizontalFilter
                    defaultValue={filter}
                    options={OPTIONS}
                    onSelect={setFilter}
                />
                {/* Chats count */}
                {
                    totalChats! > 0 && (
                        <Text className="font-JakartaSemiBold text-gray-700">
                            Chats {totalChats}
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
