import { icons } from "@/constants";
import React from "react";
import { Dimensions, Image, Modal, TouchableOpacity } from "react-native";
import {
    GestureHandlerRootView,
    PinchGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";
import Video from "react-native-video"; // or expo-av Video

const { width, height } = Dimensions.get("window");

type MediaType = "image" | "video";

interface MultimediaProps {
  visible: boolean;
  type: MediaType;
  source: string;
  onClose: () => void;
}

const Multimedia: React.FC<MultimediaProps> = ({
  visible,
  type,
  source,
  onClose,
}) => {
  const scale = useSharedValue(1);

  const pinchHandler = (event: any) => {
    scale.value = event.nativeEvent.scale;
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(scale.value) }],
  }));

  return (
    <Modal
      visible={visible}
      transparent={true}
      onRequestClose={onClose}
      statusBarTranslucent
      animationType="fade"
    >
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: "#000" }}>
        <TouchableOpacity
          onPress={onClose}
          style={{
            zIndex: 10,
            position: "absolute",
            top: 50,
            left: 20,
            backgroundColor: "rgba(0,0,0,0.5)",
            borderRadius: 20,
            width: 40,
            height: 40,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={icons.moveLeft as any}
            style={{ width: 24, height: 24, tintColor: "#fff" }}
          />
        </TouchableOpacity>

        {type === "image" ? (
          <PinchGestureHandler onGestureEvent={pinchHandler}>
            <Animated.Image
              source={{ uri: source }}
              style={[{ width, height, resizeMode: "contain" }, animatedStyle]}
            />
          </PinchGestureHandler>
        ) : (
          <Video
            source={{ uri: source }}
            style={{ width, height }}
            resizeMode="contain"
            controls
            paused={false}
          />
        )}
      </GestureHandlerRootView>
    </Modal>
  );
};

export default Multimedia;
