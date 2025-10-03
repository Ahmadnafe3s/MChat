import React, { useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ShimmerPlaceholder = ({ width, height, style }: any) => {
    const animatedValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(animatedValue, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(animatedValue, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    const opacity = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0.3, 0.7],
    });

    return (
        <Animated.View
            style={[
                {
                    width: width || "100%",
                    height: height || 20,
                    backgroundColor: "#E5E7EB",
                    borderRadius: 8,
                    opacity,
                },
                style,
            ]}
        />
    );
};

const ChatProfilePlaceholder = () => {
    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Header */}
            <View className="flex flex-row items-center px-5 py-4 bg-white border-b border-gray-200 gap-3">
                <ShimmerPlaceholder width={40} height={40} style={{ borderRadius: 20 }} />
                <ShimmerPlaceholder width={120} height={20} />
            </View>

            {/* Content */}
            <View className="flex-1 bg-gray-100 p-5 gap-3">
                {/* Profile Card */}
                <View className="bg-white rounded-3xl elevation-sm p-6">
                    <View className="flex flex-row items-center gap-3">
                        <ShimmerPlaceholder width={80} height={80} style={{ borderRadius: 40 }} />
                        <View className="flex-1 gap-2">
                            <ShimmerPlaceholder width="70%" height={28} />
                            <ShimmerPlaceholder width="50%" height={16} />
                        </View>
                    </View>
                </View>

                {/* Submit As */}
                <ShimmerPlaceholder width={80} height={14} />
                <View className="bg-white rounded-2xl shadow-sm p-2">
                    <View className="flex-row items-center justify-between p-4 rounded-xl border-b border-gray-100">
                        <ShimmerPlaceholder width={80} height={16} />
                        <ShimmerPlaceholder width={20} height={20} style={{ borderRadius: 10 }} />
                    </View>
                    <View className="flex-row items-center justify-between p-4 rounded-xl border-b border-gray-100">
                        <ShimmerPlaceholder width={80} height={16} />
                        <ShimmerPlaceholder width={20} height={20} style={{ borderRadius: 10 }} />
                    </View>
                    <View className="flex-row items-center justify-between p-4 rounded-xl">
                        <ShimmerPlaceholder width={80} height={16} />
                        <ShimmerPlaceholder width={20} height={20} style={{ borderRadius: 10 }} />
                    </View>
                </View>

                {/* Assigned To */}
                <ShimmerPlaceholder width={90} height={14} />
                <View className="flex flex-row gap-2 items-center p-2 bg-white border border-gray-200 rounded-xl">
                    <ShimmerPlaceholder width={40} height={40} style={{ borderRadius: 20 }} />
                    <ShimmerPlaceholder width={120} height={16} />
                </View>

                {/* Tags */}
                <ShimmerPlaceholder width={60} height={14} />
                <View className="flex flex-row items-center gap-3 p-2.5 bg-white border border-gray-200 rounded-xl">
                    <ShimmerPlaceholder width={40} height={40} style={{ borderRadius: 20 }} />
                    <View className="flex-1">
                        <ShimmerPlaceholder width="80%" height={16} />
                    </View>
                    <ShimmerPlaceholder width={60} height={24} style={{ borderRadius: 12 }} />
                </View>
                <View className="flex flex-row items-center gap-3 p-2.5 bg-white border border-gray-200 rounded-xl">
                    <ShimmerPlaceholder width={40} height={40} style={{ borderRadius: 20 }} />
                    <View className="flex-1">
                        <ShimmerPlaceholder width="80%" height={16} />
                    </View>
                    <ShimmerPlaceholder width={60} height={24} style={{ borderRadius: 12 }} />
                </View>

                {/* Notes */}
                <ShimmerPlaceholder width={60} height={14} />
                <View className="flex flex-row items-center gap-3 p-2.5 bg-white border border-gray-200 rounded-xl">
                    <ShimmerPlaceholder width={40} height={40} style={{ borderRadius: 20 }} />
                    <View className="flex-1">
                        <ShimmerPlaceholder width="90%" height={16} />
                    </View>
                    <ShimmerPlaceholder width={60} height={24} style={{ borderRadius: 12 }} />
                </View>
                <View className="flex flex-row items-center gap-3 p-2.5 bg-white border border-gray-200 rounded-xl">
                    <ShimmerPlaceholder width={40} height={40} style={{ borderRadius: 20 }} />
                    <View className="flex-1">
                        <ShimmerPlaceholder width="90%" height={16} />
                    </View>
                    <ShimmerPlaceholder width={60} height={24} style={{ borderRadius: 12 }} />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ChatProfilePlaceholder;