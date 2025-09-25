// Toast.tsx
import { useToastStore } from "@/store/toast";
import React from "react";
import { StyleSheet, Text } from "react-native";
import Animated, { FadeInUp, FadeOutDown } from "react-native-reanimated";

const Toast = () => {
    const message = useToastStore((s) => s.message);

    if (!message) return null;

    return (
        <Animated.View
            entering={FadeInUp.duration(300)}
            exiting={FadeOutDown.duration(300)}
            style={styles.toast}
        >
            <Text style={styles.toastText}>{message}</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    toast: {
        position: "absolute",
        bottom: 100,
        left: 20,
        right: 20,
        backgroundColor: "black",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    toastText: {
        color: "red",
        fontSize: 16,
    },
});

export default Toast;
