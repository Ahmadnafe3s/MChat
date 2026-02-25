import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const getCallIcon = (direction: string, status: string) => {
    if (status === "missed") {
        return { name: "call-outline" as const, color: "#ef4444" };
    }
    return {
        name: "call-outline" as const,
        color: direction === "incoming" ? "#10b981" : "#3b82f6",
    };
};

const formatDuration = (seconds: string) => {
    const sec = parseInt(seconds);
    if (sec < 60) return `${sec}s`;
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins}m ${secs}s`;
};

interface CallItemProps {
    item: any;
    isSelected: boolean;
    onLongPress: () => void;
    onPress: () => void;
}

const CallItem = ({ item, isSelected, onLongPress, onPress }: CallItemProps) => {
    const callIcon = getCallIcon(item.direction, item.call_status);

    return (
        <TouchableOpacity
            className={`mx-4 mb-3 rounded-xl p-4 shadow-sm border ${isSelected ? "bg-emerald-50 border-emerald-500" : "bg-white border-emerald-50"}`}
            activeOpacity={0.7}
            onLongPress={onLongPress}
            onPress={onPress}
        >
            <View className="flex-row items-center">
                <View
                    className={`w-12 h-12 rounded-full items-center justify-center ${isSelected
                        ? "bg-emerald-500"
                        : item.call_status === "missed"
                            ? "bg-red-50"
                            : item.direction === "incoming"
                                ? "bg-emerald-50"
                                : "bg-blue-50"
                        }`}
                >
                    <Ionicons
                        name={isSelected ? "checkmark" : callIcon.name}
                        size={24}
                        color={isSelected ? "#ffffff" : callIcon.color}
                    />
                </View>

                <View className="flex-1 ml-3">
                    <Text className="text-gray-900 font-semibold text-base">
                        {item.contact_name !== "N/A" ? item.contact_name : item.contact_phone}
                    </Text>
                    <View className="flex-row items-center mt-1">
                        <Text className="text-gray-500 text-sm">{item.agent_name}</Text>
                        <View className="w-1 h-1 rounded-full bg-gray-400 mx-2" />
                        <Text
                            className={`text-sm capitalize ${item.call_status === "missed" ? "text-red-500" : "text-emerald-600"}`}
                        >
                            {item.call_status}
                        </Text>
                    </View>
                </View>

                <View className="items-end">
                    <Text className="text-gray-900 text-sm font-medium">
                        {item.call_date}
                    </Text>
                    <Text className="text-gray-500 text-xs mt-1">
                        {formatDuration(item.duration)}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default CallItem;
