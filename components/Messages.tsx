// import { conversations, icons } from '@/constants';
import { icons } from '@/constants';
import { Video } from 'expo-av';
import React, { memo, useState } from 'react';
import { Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import DownloadDocument from './DownloadFile';

const Messages = memo(
    ({ data }: { data: Conversations }) => {
        const isSender = data.message_type === "user";
        const [visible, setVisible] = useState(false);
        return (
            <>
                <View
                    className={`flex flex-row items-center ${isSender ? "justify-end" : "justify-start"} px-4 mb-2`}
                >
                    <View className="flex gap-1 max-w-[90%]">
                        <View
                            className={`px-4 py-3 gap-4 ${isSender
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

                            {data?.header &&
                                data.header.format === "png" && (
                                    <TouchableOpacity onPress={() => setVisible(true)}>
                                        <Image source={{ uri: data.header.link.trim() }} className="rounded-2xl h-[300px] w-[250px]" />
                                    </TouchableOpacity>
                                )
                            }

                            {data?.header &&
                                data.header.format === "mp4" && (
                                    <TouchableOpacity onPress={() => setVisible(true)}>
                                        <Video
                                            source={{ uri: data.header.link.trim() }}
                                            style={{ borderRadius: 16, width: 250, height: 300 }}
                                        />
                                    </TouchableOpacity>
                                )
                            }

                            {
                                data.header?.format === "pdf" && (
                                    <DownloadDocument url={data.header.link.trim()} fileName={`Doc-1.pdf`} />
                                )
                            }

                            {data.body.text && (
                                <Text className={`${isSender ? "text-white" : "text-gray-800"} text-[15px] leading-5`}>
                                    {data?.body?.text}
                                </Text>
                            )}
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
                                {new Date(data?.datetime).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Image Full Screen Modal */}
                <Modal visible={visible} transparent={true} onRequestClose={() => setVisible(false)}>
                    <TouchableOpacity style={{ flex: 1, backgroundColor: '#000' }} onPress={() => setVisible(false)}>
                        <Image
                            source={{ uri: data.header?.link.trim() }}
                            style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                        />
                    </TouchableOpacity>
                </Modal>
            </>
        );
    }
);

Messages.displayName = "Messages"

export default Messages