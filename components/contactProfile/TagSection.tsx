import Select from "@/components/Select";
import { icons } from "@/constants";
import { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import React, { useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

interface TagSectionProps {
    tags: Tag[];
    selectedTags: Set<number>;
    onTagLongPress: (tagId: number) => void;
    onTagPress: (tagId: number) => void;
    createTag: UseMutationResult<any, any, { name: string }, unknown>;
    getTags: UseQueryResult<Tag[], any>;
}

const TagSection = ({
    tags,
    selectedTags,
    onTagLongPress,
    onTagPress,
    createTag,
    getTags,
}: TagSectionProps) => {
    const [tag, setTag] = useState("");
    const [switchTagInput, setSwitchTagInput] = useState(false);

    return (
        <>
            <View className="gap-2.5">
                <View className="flex flex-row items-center gap-2 px-1">
                    <View className="w-1 h-4 bg-purple-500 rounded-full" />
                    <Text className="text-sm font-JakartaBold text-gray-800">Tag</Text>
                </View>
                {switchTagInput ? (
                    <View className="flex flex-row items-center px-4 gap-3 border-2 bg-white border-gray-100 rounded-2xl shadow-sm">
                        <Image source={icons.tag as any} className="w-5 h-5" tintColor={"#9333ea"} />
                        <TextInput
                            value={tag}
                            onChangeText={(text) => setTag(text)}
                            placeholder="Add a tag"
                            placeholderTextColor="#9ca3af"
                            className="flex-1 rounded-xl py-4 font-JakartaMedium"
                            maxLength={100}
                        />
                        {createTag.isPending ? (
                            <ActivityIndicator color={'#10b981'} />
                        ) : (
                            <TouchableOpacity
                                onPress={() => createTag.mutate({ name: tag }, { onSuccess: () => setTag("") })}
                                disabled={!tag}
                                className={`${!tag && 'opacity-40'}`}
                            >
                                <View className="bg-emerald-500 rounded-xl p-2 shadow-md">
                                    <Image
                                        source={icons.add as any}
                                        className="size-5"
                                        tintColor={"#fff"}
                                    />
                                </View>
                            </TouchableOpacity>
                        )}
                    </View>
                ) : (
                    <Select
                        value={tag}
                        options={getTags.data?.map((t) => ({ value: `${t.id}+${t.name}`, label: t.name })) || []}
                        onValueChange={(value) => {
                            setTag(value)
                            createTag.mutate({ name: value.split('+')[1] }, { onSuccess: () => setTag("") })
                        }}
                    />
                )}

                <TouchableOpacity
                    onPress={() => {
                        setTag("")
                        setSwitchTagInput(!switchTagInput)
                    }}
                    className="flex flex-row justify-end"
                >
                    <Text className="text-sm font-JakartaSemiBold text-emerald-600 text-end">
                        {!switchTagInput ? "custom tag" : "select a tag"}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Tag List */}
            {tags.length > 0 && (
                <View className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm max-h-80">
                    <ScrollView
                        nestedScrollEnabled={true}
                        showsVerticalScrollIndicator={true}
                    >
                        {tags.map((tag, index) => {
                            const isSelected = selectedTags.has(tag.id);
                            return (
                                <TouchableOpacity
                                    key={tag.id}
                                    activeOpacity={0.5}
                                    onLongPress={() => onTagLongPress(tag.id)}
                                    onPress={() => onTagPress(tag.id)}
                                    className={`flex flex-col gap-2 p-3.5 ${isSelected ? 'bg-purple-50' : 'bg-white'} ${index !== tags.length - 1 ? 'border-b border-gray-50' : ''
                                        }`}
                                >
                                    <View className="flex flex-row items-center gap-3">
                                        <View className={`${isSelected ? 'bg-purple-500' : 'bg-purple-50'} rounded-xl size-11 flex items-center justify-center`}>
                                            <Image source={isSelected ? icons.check as any : icons.tag as any} className="w-5 h-5" tintColor={isSelected ? "#fff" : "#9333ea"} />
                                        </View>
                                        <Text className={`${isSelected ? 'text-purple-700' : 'text-gray-700'} text-base flex-1 font-JakartaMedium`}>
                                            {tag.name}
                                        </Text>
                                    </View>
                                    <View className="flex flex-row justify-end">
                                        <Text className={`text-xs font-JakartaMedium py-1.5 px-3 rounded-xl ${isSelected ? 'text-purple-500 bg-purple-100' : 'text-gray-500 bg-gray-50'}`}>
                                            {new Date(tag.created_at).toLocaleTimeString([], {
                                                day: "numeric",
                                                month: "short",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </View>
            )}
        </>
    );
};

export default TagSection;
