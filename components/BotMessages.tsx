import useBot from "@/hooks/useBot";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetBackdrop, BottomSheetFlatList, BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { forwardRef, useMemo } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

interface BotMessagesProps {
    onSelect?: (id: number) => void;
    isSending?: boolean;
}

const BotMessages = forwardRef<BottomSheetModal, BotMessagesProps>(({ onSelect, isSending }, ref) => {

    const Points = useMemo(() => ["40%", "60%", "90%"], []);
    const renderBackdrop = React.useCallback((props: any) => (
        <BottomSheetBackdrop
            {...props}
            enableTouchThrough
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            opacity={0.5}
        />
    ), []);

    const { getBotMessage } = useBot()

    const { data: botMessages, isLoading } = getBotMessage()

    return (
        <BottomSheetModal
            ref={ref}
            snapPoints={Points}
            index={0}
            enablePanDownToClose={true}
            enableDynamicSizing={false}
            backdropComponent={renderBackdrop}
        >
            <View className="px-4 py-3 border-b border-gray-100 flex-row justify-between items-center">
                <View className="flex-row items-center gap-2">
                    <Text className="text-xl font-JakartaBold text-gray-800">Bot Messages</Text>
                    {botMessages?.count !== undefined && (
                        <View className="bg-blue-100 px-2 py-0.5 rounded-full">
                            <Text className="text-[10px] font-JakartaBold text-blue-600">{botMessages.count}</Text>
                        </View>
                    )}
                </View>
                <View className="flex-row items-center gap-2">
                    {isSending && (
                        <View className="flex-row items-center gap-1.5 bg-amber-50 px-2 py-1 rounded-lg">
                            <ActivityIndicator size="small" color="#d97706" />
                            <Text className="text-[10px] font-JakartaBold text-amber-600 uppercase">Sending</Text>
                        </View>
                    )}
                    {isLoading && <ActivityIndicator size="small" color="#3b82f6" />}
                </View>
            </View>

            <BottomSheetFlatList
                data={botMessages?.data}
                contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12, paddingBottom: 40 }}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        disabled={isSending}
                        onPress={() => onSelect?.(item.id)}
                        className={`bg-white border border-gray-100 rounded-2xl p-4 mb-3 shadow-sm flex-row items-center ${isSending ? 'opacity-50' : ''}`}
                    >
                        <View className="w-12 h-12 bg-blue-50 rounded-full items-center justify-center mr-4">
                            <Ionicons name="chatbubble-ellipses" size={24} color="#3b82f6" />
                        </View>
                        <View className="flex-1">
                            <View className="flex-row justify-between items-center mb-1">
                                <Text className="text-base font-JakartaBold text-gray-800" numberOfLines={1}>
                                    {item.name}
                                </Text>
                                <View className="bg-gray-100 px-2 py-0.5 rounded-md">
                                    <Text className="text-[10px] font-JakartaBold text-gray-500 uppercase">
                                        {item.keyword}
                                    </Text>
                                </View>
                            </View>
                            <View className="flex-row items-center">
                                <Ionicons name="time-outline" size={12} color="#9ca3af" />
                                <Text className="text-xs font-JakartaMedium text-gray-400 ml-1">
                                    {new Date(item.created_at).toLocaleDateString()}
                                </Text>
                            </View>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#d1d5db" />
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={
                    !isLoading ? (
                        <View className="items-center justify-center py-20">
                            <Ionicons name="document-text-outline" size={48} color="#e5e7eb" />
                            <Text className="text-gray-400 mt-4 font-JakartaMedium">No bot messages found</Text>
                        </View>
                    ) : null
                }
            />
        </BottomSheetModal>
    );
});

export default BotMessages;