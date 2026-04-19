import Select from "@/components/Select";
import { icons } from "@/constants";
import { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import React, { useState } from "react";
import { ActivityIndicator, Image, Text, TextInput, TouchableOpacity, View } from "react-native";

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
                    className="flex flex-row items-center justify-end py-1"
                >
                    <Image 
                        source={switchTagInput ? icons.search as any : icons.add as any} 
                        className="w-3.5 h-3.5 mr-1.5" 
                        tintColor="#10b981" 
                    />
                    <Text className="text-[13px] font-JakartaSemiBold text-emerald-600">
                        {!switchTagInput ? "Custom tag" : "Select from list"}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Tag List - Chip Grid */}
            {tags.length > 0 && (
                <View className="flex flex-row flex-wrap gap-2.5 mt-2">
                    {tags.map((tag) => {
                        const isSelected = selectedTags.has(tag.id);
                        return (
                            <TouchableOpacity
                                key={tag.id}
                                activeOpacity={0.6}
                                onLongPress={() => onTagLongPress(tag.id)}
                                onPress={() => onTagPress(tag.id)}
                                className={`flex flex-row items-center px-3.5 py-2 rounded-xl border ${
                                    isSelected 
                                    ? 'bg-purple-100/50 border-purple-400' 
                                    : 'bg-transparent border-gray-200'
                                }`}
                            >
                                {isSelected && (
                                    <View className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-2" />
                                )}
                                <View className="flex flex-col">
                                    <Text 
                                        className={`text-sm font-JakartaSemiBold ${
                                            isSelected ? 'text-purple-700' : 'text-gray-600'
                                        }`}
                                    >
                                        {tag.name}
                                    </Text>
                                    <Text className={`text-[10px] font-JakartaMedium ${
                                        isSelected ? 'text-purple-500/70' : 'text-gray-400'
                                    }`}>
                                       {tag.created_at}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            )}
        </>
    );
};

export default TagSection;
