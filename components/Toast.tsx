// components/Toast.tsx
import { icons } from "@/constants";
import { useToastStore } from "@/store/toast";
import React from "react";
import { Dimensions, Image, Modal, Platform, StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown, FadeOutUp } from "react-native-reanimated";

const { width } = Dimensions.get("window");

export default function Toast() {
  const { toast } = useToastStore();

  if (!toast) return null;

  return (
    <Modal
      transparent
      visible={!!toast}
      animationType="none"
      statusBarTranslucent
      pointerEvents="none"
      presentationStyle="overFullScreen"
    >
      <View style={styles.modalOverlay} pointerEvents="none">
        <Animated.View 
          style={styles.container}
          entering={FadeInDown.duration(300).springify()}
          exiting={FadeOutUp.duration(200)}
          pointerEvents="none"
        >
          <View
            style={[
              styles.toast,
              toast.type === "success" ? styles.successToast : styles.errorToast,
            ]}
          >
            <Image
              source={
                toast.type === "success" ? icons.check_circle : icons.failed
              }
              style={styles.icon}
            />
            <Text style={styles.text} numberOfLines={3}>
              {toast.message}
            </Text>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  container: {
    position: 'absolute',
    bottom: Platform.OS === 'android' ? 60 : 80,
    left: 0,
    right: 0,
    alignItems: "center",
    paddingHorizontal: 24,
  },
  toast: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 30,
    maxWidth: width - 48,
    minWidth: 180,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  successToast: {
    backgroundColor: Platform.OS === 'android' 
      ? "rgba(0, 0, 0, 0.85)" 
      : "rgba(0, 0, 0, 0.92)",
  },
  errorToast: {
    backgroundColor: Platform.OS === 'android' 
      ? "rgba(0, 0, 0, 0.85)" 
      : "rgba(0, 0, 0, 0.92)",
  },
  text: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
    flexWrap: "wrap",
    flexShrink: 1,
    lineHeight: 18,
    letterSpacing: 0.2,
  },
  icon: {
    width: 18,
    height: 18,
    marginRight: 10,
    tintColor: "#fff",
  },
});