import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";

interface CustomFieldSectionProps {
    customFields: CustomField[];
    onSubmit?: (updatedFields: Record<string, any>) => void;
    isLoading?: boolean;
}

const CustomFieldSection = ({ customFields, onSubmit, isLoading }: CustomFieldSectionProps) => {
    const [localFields, setLocalFields] = useState<CustomField[]>(customFields);
    const [showDatePicker, setShowDatePicker] = useState<number | null>(null);

    useEffect(() => {
        setLocalFields(customFields);
    }, [customFields]);

    const handleValueChange = (id: number, newValue: any) => {
        setLocalFields((prev) =>
            prev.map((field) => (field.id === id ? ({ ...field, value: newValue } as CustomField) : field))
        );
    };

    const toggleChoice = (id: number, option: string, type: string) => {
        setLocalFields((prev) =>
            prev.map((field) => {
                if (field.id !== id) return field;
                let currentValues = Array.isArray(field.value) ? field.value : [field.value].filter(Boolean);
                
                if (type === "single-choice") {
                    return { ...field, value: [option] } as CustomField;
                } else {
                    if (currentValues.includes(option)) {
                        return { ...field, value: currentValues.filter((v) => v !== option) } as CustomField;
                    } else {
                        return { ...field, value: [...currentValues, option] } as CustomField;
                    }
                }
            })
        );
    };

    const handleSubmit = () => {
        if (onSubmit) {
            const submissionData = localFields.reduce((acc, field) => {
                acc[field.name] = field.value;
                return acc;
            }, {} as Record<string, any>);
            onSubmit(submissionData);
        }
    };

    const renderField = (field: CustomField) => {
        switch (field.type) {
            case "text":
                return (
                    <View className="flex flex-row items-center px-4 py-3 border border-gray-100 bg-gray-50/50 rounded-xl">
                        <TextInput
                            placeholder={`Enter ${field.title}`}
                            placeholderTextColor="#9ca3af"
                            className="flex-1 font-JakartaMedium text-gray-700"
                            value={String(field.value || "")}
                            onChangeText={(text) => handleValueChange(field.id, text)}
                        />
                    </View>
                );

            case "date-picker":
                const dateValue = field.value ? new Date(String(field.value)) : new Date();
                return (
                    <View>
                        <TouchableOpacity
                            onPress={() => setShowDatePicker(field.id)}
                            className="flex flex-row items-center justify-between px-4 py-3 border border-gray-100 bg-gray-50/50 rounded-xl"
                        >
                            <Text className={`font-JakartaMedium ${field.value ? "text-gray-700" : "text-gray-400"}`}>
                                {field.value ? String(field.value) : "Select date"}
                            </Text>
                            <Ionicons name="calendar-outline" size={20} color="#10b981" />
                        </TouchableOpacity>
                        {showDatePicker === field.id && (
                            <DateTimePicker
                                value={isNaN(dateValue.getTime()) ? new Date() : dateValue}
                                mode="date"
                                display={Platform.OS === "ios" ? "spinner" : "default"}
                                onChange={(event, selectedDate) => {
                                    setShowDatePicker(null);
                                    if (selectedDate) {
                                        handleValueChange(field.id, selectedDate.toISOString().split("T")[0]);
                                    }
                                }}
                            />
                        )}
                    </View>
                );

            case "single-choice":
            case "multiple-choice":
                const fieldValues = Array.isArray(field.value) ? field.value : [field.value].filter(Boolean);
                return (
                    <View className="flex-row flex-wrap gap-2">
                        {Array.isArray(field.options) && field.options.map((option) => {
                            const isSelected = fieldValues.includes(option);
                            return (
                                <TouchableOpacity
                                    key={option}
                                    onPress={() => toggleChoice(field.id, option, field.type)}
                                    className={`px-4 py-2 rounded-full border ${
                                        isSelected 
                                            ? "bg-emerald-500 border-emerald-500" 
                                            : "bg-white border-gray-200"
                                    }`}
                                >
                                    <Text className={`text-xs font-JakartaSemiBold ${isSelected ? "text-white" : "text-gray-600"}`}>
                                        {option}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                );

            default:
                return null;
        }
    };

    if (!customFields || customFields.length === 0) return null;

    return (
        <View className="gap-4">
            <View className="flex flex-row items-center gap-2 px-1">
                <View className="w-1 h-4 bg-emerald-500 rounded-full" />
                <Text className="text-sm font-JakartaBold text-gray-800">Custom Fields</Text>
            </View>

            <View className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 gap-5">
                {localFields.map((field) => (
                    <View key={field.id} className="gap-2">
                        <Text className="text-xs font-JakartaSemiBold text-gray-500 ml-1">
                            {field.title.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                        </Text>
                        {renderField(field)}
                    </View>
                ))}

                <TouchableOpacity
                    onPress={handleSubmit}
                    disabled={isLoading}
                    className={`mt-2 bg-emerald-500 rounded-xl py-3.5 items-center shadow-md active:bg-emerald-600 ${
                        isLoading ? "opacity-70" : ""
                    }`}
                >
                    {isLoading ? <ActivityIndicator color="#fff" /> : <Text className="text-white font-JakartaBold text-base">Submit</Text>}
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CustomFieldSection;
