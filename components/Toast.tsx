// components/Toast.tsx
import { icons } from "@/constants";
import { useToastStore } from "@/store/toast";
import React from "react";
import { Dimensions, Image, StyleSheet, Text } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

const { width } = Dimensions.get("window");

export default function Toast() {
  const { toast } = useToastStore();

  if (!toast) return null;

  return (
    <Animated.View style={[styles.toast]} entering={FadeIn.duration(1000)}>
      <Image
        source={
          toast.type === "success" ? icons.check_circle : (icons.failed as any)
        }
        style={styles.icon}
      />
      <Text style={styles.text}>{toast.message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toast: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: 100,
    backgroundColor: "rgba(0,0,0,0.7)",
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    maxWidth: width - 40,
    zIndex: 9999,
  },
  text: {
    color: "#fff",
    width: "100%",
    flexWrap: "wrap",
    flexShrink: 1,
  },
  icon: {
    width: 19,
    height: 19,
    marginRight: 10,
    tintColor: "#fff",
  },
});
