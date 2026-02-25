import { icons } from "@/constants";
import { UseMutationResult } from "@tanstack/react-query";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const submitAsOptions = ["Open", "Solved", "Pending"];

interface SubmitAsSectionProps {
    role?: string;
    currentValue?: string;
    submitAs: UseMutationResult<any, any, { submit_as: string }, unknown>;
}

const SubmitAsSection = ({ role, currentValue, submitAs }: SubmitAsSectionProps) => {
    return (
        <View className="gap-2.5">
            <View className="flex flex-row items-center gap-2 px-1">
                <View className="w-1 h-4 bg-emerald-500 rounded-full" />
                <Text className="text-sm font-JakartaBold text-gray-800">
                    Submit As
                </Text>
            </View>

            {role === "user" ? (
                <View className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                    {submitAsOptions.map((option, index) => (
                        <TouchableOpacity
                            key={option}
                            disabled={submitAs.isPending}
                            onPress={() => submitAs.mutate({ submit_as: option })}
                            className={`flex-row items-center justify-between p-4 ${currentValue === option
                                ? "bg-emerald-50"
                                : "bg-white active:bg-gray-50"
                                } ${index !== submitAsOptions.length - 1 ? "border-b border-gray-50" : ""}`}
                        >
                            <Text
                                className={`font-JakartaSemiBold text-base ${currentValue === option
                                    ? "text-emerald-600"
                                    : "text-gray-700"
                                    }`}
                            >
                                {option}
                            </Text>
                            {currentValue === option && (
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
                        {currentValue}
                    </Text>
                    <View className="bg-emerald-500 rounded-full size-6 flex items-center justify-center shadow-md">
                        <Image source={icons.check as any} className="w-3.5 h-3.5" tintColor={'#fff'} />
                    </View>
                </View>
            )}
        </View>
    );
};

export default SubmitAsSection;
