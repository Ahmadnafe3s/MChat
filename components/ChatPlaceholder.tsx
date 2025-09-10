import React, { useEffect, useRef } from "react";
import { Animated, TouchableOpacity, View } from "react-native";

const ChatCardPlaceholder = () => {
    const shimmerAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const shimmer = () => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(shimmerAnimation, {
                        toValue: 1,
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(shimmerAnimation, {
                        toValue: 0,
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        };

        shimmer();
    }, [shimmerAnimation]);

    const shimmerStyle = {
        opacity: shimmerAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0.3, 0.7],
        }),
    };

    return (
        <TouchableOpacity
            className="bg-white px-4 py-4 flex flex-row items-center gap-2 rounded-2xl"
            disabled
        >
            {/* Avatar placeholder */}
            <Animated.View
                className="bg-gray-200 rounded-full size-[45px] flex items-center justify-center"
                style={shimmerStyle}
            >
            </Animated.View>

            {/* Content placeholder */}
            <View className="flex flex-1">
                {/* Name placeholder */}
                <Animated.View
                    className="bg-gray-200 h-4 rounded mr-2 mb-2"
                    style={[{ width: '60%' }, shimmerStyle]}
                />

                {/* Last message placeholder */}
                <Animated.View
                    className="bg-gray-200 h-3 rounded mr-5 mb-2"
                    style={[{ width: '80%' }, shimmerStyle]}
                />

                {/* Status placeholder */}
                <Animated.View
                    className="bg-gray-200 h-5 rounded-full max-w-16"
                    style={[{ width: 50 }, shimmerStyle]}
                />
            </View>

            {/* Right side placeholder */}
            <View className="flex items-center gap-2">
                {/* Time placeholder */}
                <Animated.View
                    className="bg-gray-200 h-3 rounded"
                    style={[{ width: 40 }, shimmerStyle]}
                />

                {/* Unread count placeholder */}
                <Animated.View
                    className="bg-gray-200 rounded-full"
                    style={[{ width: 24, height: 24 }, shimmerStyle]}
                />
            </View>
        </TouchableOpacity>
    );
};

export default ChatCardPlaceholder;