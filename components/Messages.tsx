// import { conversations, icons } from '@/constants';
import { conversations, icons } from '@/constants';
import React, { memo } from 'react';
import { Image, Text, View } from 'react-native';

const Messages = memo(
    ({ data, senderId }: { data: typeof conversations[0], senderId: number }) => {
        const isSender = data.senderID === senderId;

        return (
            <View
                className={`flex flex-row items-center ${isSender ? "justify-end" : "justify-start"} px-4 mb-2`}
            >
                <View className="flex gap-1 max-w-[85%]">
                    <View
                        className={`px-4 py-3 ${isSender
                            ? // Sender bubble (right side) - sharp corner on bottom-right
                            "bg-[#42d6a6] rounded-tl-[18px] rounded-tr-[18px] rounded-bl-[18px] rounded-br-[4px] ml-16 elevation-sm"
                            : // Receiver bubble (left side) - sharp corner on bottom-left
                            "bg-white rounded-tr-[18px] rounded-tl-[18px] rounded-br-[18px] rounded-bl-[4px] mr-16 elevation-sm"
                            }`}
                        style={{
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowOpacity: 0.1,
                            shadowRadius: 2,
                        }}
                    >
                        <Text className={`${isSender ? "text-black" : "text-gray-800"} text-[15px] leading-5`}>
                            {data?.text}
                        </Text>
                    </View>

                    <View
                        className={`flex flex-row gap-2 items-center ${isSender ? "self-end" : "self-start"
                            } mx-1`}
                    >
                        {isSender && (
                            <Image
                                source={data.status === "read" ? icons.doubleCheck : icons.check as any}
                                className="w-4 h-4"
                                tintColor={data.status === "read" ? "#10B981" : "#A3A3A3"}
                            />
                        )}
                        <Text className="text-neutral-400 text-xs font-Jakarta">
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