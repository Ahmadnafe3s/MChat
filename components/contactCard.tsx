import { useChatStore } from "@/store/chat";
import { useRouter } from "expo-router";
import React, { memo } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const ContactCard = memo(

    ({ data }: { data: Contact }) => {
        const router = useRouter();
        const { setSelectedChat } = useChatStore();

        const handleSelect = () => {
            setSelectedChat(data);
            router.push(`/(root)/conversation`);
        };

        return (
            <TouchableOpacity className="bg-white px-4 py-4 flex flex-row items-center gap-2" onPress={handleSelect} activeOpacity={0.6}>
                <View className="bg-amber-100 rounded-full size-[45px] flex items-center justify-center">
                    <Text className="font-JakartaSemiBold text-xl uppercase text-amber-500">
                        {data?.formatted}
                    </Text>
                </View>

                <View className="flex flex-1">
                    <Text className="font-JakartaSemiBold text-gray-600 mr-2" numberOfLines={1}>
                        {data?.name}
                    </Text>
                    <Text
                        numberOfLines={1}
                        className="text-neutral-400 mr-5 font-Jakarta"
                    >
                        {data?.phone}
                    </Text>
                    <Text
                        className={`text-sm py-0.5 px-1 rounded-full text-center mt-1 max-w-16
                             ${data?.status === "Active"
                                ? "bg-green-100 text-green-700"
                                : data?.status === "Create"
                                    ? "bg-amber-100 text-amber-700"
                                    : "bg-red-100 text-red-600"
                            }`}
                    >
                        {data?.status}
                    </Text>
                </View>

                <View className="flex items-center gap-2">
                    <Text className="text-neutral-400 text-sm font-JakartaBold">
                        {data?.source}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
)

ContactCard.displayName = "ContactCard";


export default ContactCard;
