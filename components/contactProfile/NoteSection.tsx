import { icons } from "@/constants";
import { UseMutationResult } from "@tanstack/react-query";
import React, { useState } from "react";
import { ActivityIndicator, Image, Text, TextInput, TouchableOpacity, View } from "react-native";

interface NoteSectionProps {
    notes: Note[];
    createNote: UseMutationResult<any, any, { note: string }, unknown>;
}

const NoteSection = ({ notes, createNote }: NoteSectionProps) => {
    const [note, setNote] = useState("");

    return (
        <>
            <View className="gap-2.5">
                <View className="flex flex-row items-center gap-2 px-1">
                    <View className="w-1 h-4 bg-amber-500 rounded-full" />
                    <Text className="text-sm font-JakartaBold text-gray-800">Note</Text>
                </View>
                <View className="flex flex-row px-4 py-2 border-2 bg-white border-gray-100 rounded-2xl shadow-sm">
                    <View className="mr-3 mt-3">
                    </View>
                    <TextInput
                        placeholder="Add a note"
                        placeholderTextColor="#9ca3af"
                        multiline
                        numberOfLines={5}
                        className="flex-1 rounded-xl py-3 min-h-28 font-JakartaMedium"
                        style={{ textAlignVertical: "top" }}
                        value={note}
                        onChangeText={(text) => setNote(text)}
                        maxLength={500}
                    />
                    {createNote.isPending ? (
                        <ActivityIndicator color={'#10b981'} className="mt-auto mb-2 ml-2" />
                    ) : (
                        <TouchableOpacity
                            disabled={!note}
                            className={`mt-auto mb-2 ml-2 ${!note && 'opacity-40'}`}
                            onPress={() => createNote.mutate({ note }, { onSuccess: () => setNote("") })}
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
            </View>

            {/* Note List */}
            {notes.length > 0 && (
                <View className="gap-3">
                    {notes.map((note) => (
                        <View
                            key={note.id}
                            className="bg-white rounded-2xl border border-amber-100 shadow-sm p-4 gap-2"
                        >
                            <Text className="text-gray-700 text-base font-JakartaMedium leading-6 px-1">
                                {note.text}
                            </Text>
                            <View className="flex flex-row items-start gap-3">
                                <View className="flex-1">
                                    <Text className="text-xs text-gray-500 font-JakartaMedium py-1.5 px-3 rounded-xl self-start">
                                        {note.created_at}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            )}
        </>
    );
};

export default NoteSection;
