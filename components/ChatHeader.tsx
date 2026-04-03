import { icons } from "@/constants";
import React from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import HorizontalFilter from "./HorizontalFilter";


interface ChatsHeaderProps {
    filter: string;
    totalChats?: number;
    setFilter: (value: string) => void;
    search: string
    onSearch: (value: string) => void
    options: string[]
    info?: string
    onClearSearch?: () => void
}

const ChatsHeader: React.FC<ChatsHeaderProps> = React.memo(
    ({ filter, setFilter, totalChats, options, search, onSearch, info, onClearSearch }) => {

        const [localSearch, setLocalSearch] = React.useState(search);

        // Keep local state in sync when search prop changes (e.g. from clear button or external reset)
        React.useEffect(() => {
            setLocalSearch(search);
        }, [search]);

        const handleSearch = (value: string) => {
            setLocalSearch(value);
            onSearch(value);
        };

        return (
            <View className="flex gap-4 mt-4 pb-2">
                <View className="flex px-4 gap-2 flex-row mb-4 mt-2 items-center  border border-gray-200 rounded-2xl bg-gray-100">
                    <Image source={icons.search as any} className="w-5 h-5 opacity-40" />
                    <TextInput
                        placeholder="Search by name or contact"
                        placeholderTextColor={"#A3A3A3"}
                        className="py-3 flex-1 text-base font-Jakarta"
                        value={localSearch}
                        onChangeText={handleSearch}
                    />
                    {localSearch.length > 0 && (
                        <TouchableOpacity
                            onPress={() => { handleSearch(""), onClearSearch?.() }}
                            className="p-1 bg-gray-300/30 rounded-full"
                        >
                            <Image
                                source={icons.cross as any}
                                className="w-4 h-4"
                                tintColor="#6b7280"
                            />
                        </TouchableOpacity>
                    )}
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
