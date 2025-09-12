import { conversations, icons } from '@/constants';
import React, { memo } from 'react';
import { Image, Text, View } from 'react-native';

const Messages = memo(
    ({ data, senderId }: { data: typeof conversations[0], senderId: number }) => {
        const isSender = data.senderID === senderId;

        return (
            <View
                className={`flex flex-row items-center ${isSender ? "justify-end" : "justify-start"} px-4`}
            >
                <View className="flex gap-1 max-w-[70%]">

                    <View
                        className={`px-4 py-3 ${isSender
                            ? "bg-[#42d6a6] rounded-tl-2xl rounded-tr-lg rounded-bl-2xl rounded-br-2xl ml-16 shadow-md"
                            : "bg-white rounded-tr-2xl rounded-tl-lg rounded-br-2xl rounded-bl-2xl mr-16 shadow-sm"
                            }`}
                    >
                        <Text className={`${isSender ? "text-white" : "text-gray-800"} text-base`}>
                            {data?.text}
                        </Text>
                    </View>

                    <View
                        className={`flex flex-row gap-2 items-center ${isSender ? "self-end" : "self-start"
                            } ml-1 mr-1`}
                    >
                        {isSender && (
                            <Image
                                source={data.status === "read" ? icons.doubleCheck : icons.check as any}
                                className="w-4 h-4"
                                tintColor={data.status === "read" ? "#10B981" : "#A3A3A3"}
                            />
                        )}
                        <Text className="text-neutral-400 text-xs font-Jakarta italic">
                            {new Date(data?.timestamp).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                            })}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
);



Messages.displayName = "Messages"

export default Messages