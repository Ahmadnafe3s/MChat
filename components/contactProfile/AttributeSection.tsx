import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from "react-native";

interface AttributeSectionProps {
    attributes: Attribute[];
    onSubmit?: (updatedAttributes: { id: number; text: string }[]) => void;
    isLoading?: boolean;
}

const AttributeSection = ({ attributes, onSubmit, isLoading }: AttributeSectionProps) => {
    const [localAttributes, setLocalAttributes] = useState<Attribute[]>(attributes);

    useEffect(() => {
        setLocalAttributes(attributes);
    }, [attributes]);

    const handleInputChange = (id: number, newValue: string) => {
        setLocalAttributes((prev) =>
            prev.map((attr) => (attr.id === id ? { ...attr, value: newValue } : attr))
        );
    };

    const handleSubmit = () => {
        if (onSubmit) {
            const submissionData = localAttributes.map(attr => ({
                id: attr.id,
                text: attr.value
            }));
            onSubmit(submissionData);
        }
    };

    if (!attributes || attributes.length === 0) return null;

    return (
        <View className="gap-4">
            <View className="flex flex-row items-center gap-2 px-1">
                <View className="w-1 h-4 bg-emerald-500 rounded-full" />
                <Text className="text-sm font-JakartaBold text-gray-800">Custom Attributes</Text>
            </View>

            <View className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 gap-4">
                {localAttributes.map((attr) => (
                    <View key={attr.id} className="gap-1.5">
                        <Text className="text-xs font-JakartaSemiBold text-gray-500 ml-1">
                            {attr?.title?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </Text>
                        <View className="flex flex-row items-center px-4 py-3 border border-gray-100 bg-gray-50/50 rounded-xl">
                            <TextInput
                                placeholder={`Enter ${attr?.title}`}
                                placeholderTextColor="#9ca3af"
                                className="flex-1 font-JakartaMedium text-gray-700"
                                value={attr?.value || ""}
                                onChangeText={(text) => handleInputChange(attr.id, text)}
                            />
                        </View>
                    </View>
                ))}

                <TouchableOpacity
                    onPress={handleSubmit}
                    disabled={isLoading}
                    className={`mt-2 bg-emerald-500 rounded-xl py-3.5 items-center shadow-md active:bg-emerald-600 ${isLoading ? 'opacity-70' : ''}`}
                >
                    {isLoading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text className="text-white font-JakartaBold text-base">Submit</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AttributeSection;
