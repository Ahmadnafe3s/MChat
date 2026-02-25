import { icons } from "@/constants";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

interface StatusConfig {
    label: string;
    value: number | string;
    color: string;
    bgColor: string;
    borderColor: string;
    icon: string;
    iconName: string;
    status: string;
}

const getStatusCards = (statuses: any, allCount: number): StatusConfig[] => [
    {
        label: "All Calls",
        value: statuses.total ?? 0,
        color: "text-amber-500",
        bgColor: "bg-amber-50",
        borderColor: "border-amber-200",
        icon: "#f59e0b",
        iconName: "call",
        status: "All",
    },
    {
        label: "Missed",
        value: statuses.missed ?? 0,
        color: "text-red-500",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        icon: "#ef4444",
        iconName: "call_missed",
        status: "Missed",
    },
    {
        label: "Answered",
        value: statuses.answered ?? 0,
        color: "text-green-500",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        icon: "#10b981",
        iconName: "call",
        status: "Answered",
    },
    {
        label: "Outgoing",
        value: statuses.outgoing ?? 0,
        color: "text-blue-500",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200",
        icon: "#3b82f6",
        iconName: "call_outgoing",
        status: "Outgoing",
    },
    {
        label: "Incoming",
        value: statuses.incoming ?? 0,
        color: "text-emerald-500",
        bgColor: "bg-emerald-50",
        borderColor: "border-emerald-200",
        icon: "#16a34a",
        iconName: "call_incoming",
        status: "Incoming",
    },
];

interface CallStatusCardsProps {
    statuses: any;
    count: number;
    onStatusSelect: (status: string) => void;
}

const CallStatusCards = ({ statuses, count, onStatusSelect }: CallStatusCardsProps) => {
    const cards = getStatusCards(statuses, count);

    return (
        <View className="px-4 py-3">
            <ScrollView
                horizontal
                nestedScrollEnabled
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingRight: 16 }}
                className="flex-row"
            >
                {cards.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        activeOpacity={0.7}
                        onPress={() => onStatusSelect(item.status)}
                        style={{
                            shadowColor: item.icon,
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.1,
                            shadowRadius: 8,
                            elevation: 3,
                        }}
                    >
                        <View
                            className={`mr-3 ${item.bgColor} flex flex-row gap-2 items-center rounded-2xl px-4 py-2 border ${item.borderColor} shadow-sm ${index === 0 ? "w-40" : "w-36"}`}
                        >
                            <View
                                className="w-12 h-12 rounded-xl bg-white items-center justify-center mb-3"
                                style={{
                                    shadowColor: "#000",
                                    shadowOffset: { width: 0, height: 1 },
                                    shadowOpacity: 0.05,
                                    shadowRadius: 2,
                                    elevation: 1,
                                }}
                            >
                                <Image
                                    source={icons[item.iconName as keyof typeof icons] as any}
                                    className="size-6"
                                    tintColor={item.icon}
                                />
                            </View>

                            <View>
                                <Text className={`text-3xl font-extrabold ${item.color} mb-1`}>
                                    {item.value}
                                </Text>
                                <Text className="text-gray-600 text-xs font-medium tracking-wide">
                                    {item.label}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

export default CallStatusCards;
