import React from "react";
import { Image, Text, View } from "react-native";

interface ProfileCardProps {
    formatted?: string;
    name?: string;
    phone?: string;
    flag?: string;
}

const ProfileCard = ({ formatted, name, phone, flag }: ProfileCardProps) => {
    return (
        <View className="bg-white rounded-3xl shadow-lg p-6 border border-emerald-100">
            <View className="flex flex-row items-center gap-4">
                <View className="bg-emerald-500 rounded-2xl size-20 flex items-center justify-center shadow-md">
                    <Text className="font-JakartaBold text-3xl text-white">
                        {formatted}
                    </Text>
                </View>
                <View className="flex-1 gap-1.5">
                    <Text className="text-2xl font-JakartaBold text-gray-900">
                        {name}
                    </Text>
                    <View className="flex flex-row items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full self-start">
                        <Image source={{ uri: flag }} className="w-4 h-4" />
                        <Text className="text-sm text-gray-600 font-JakartaMedium">
                            {phone}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default ProfileCard;
