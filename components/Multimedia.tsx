import { icons } from "@/constants";
import React from "react";
import { Dimensions, Image, Modal, TouchableOpacity, View } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import Video from "react-native-video";

const { width, height } = Dimensions.get("window");

const SPRING_CONFIG = { damping: 15, stiffness: 150 };
const MIN_SCALE = 1;
const MAX_SCALE = 5;

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
  const savedScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);

  const resetTransforms = () => {
    "worklet";
    scale.value = withSpring(1, SPRING_CONFIG);
    savedScale.value = 1;
    translateX.value = withSpring(0, SPRING_CONFIG);
    translateY.value = withSpring(0, SPRING_CONFIG);
    savedTranslateX.value = 0;
    savedTranslateY.value = 0;
  };

  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      const newScale = savedScale.value * e.scale;
      scale.value = Math.min(Math.max(newScale, MIN_SCALE), MAX_SCALE);
    })
    .onEnd(() => {
      savedScale.value = scale.value;
      if (scale.value < MIN_SCALE) {
        resetTransforms();
      }
    });

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      if (savedScale.value > 1) {
        translateX.value = savedTranslateX.value + e.translationX;
        translateY.value = savedTranslateY.value + e.translationY;
      }
    })
    .onEnd(() => {
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    });

  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      if (savedScale.value > 1) {
        resetTransforms();
      } else {
        scale.value = withSpring(2.5, SPRING_CONFIG);
        savedScale.value = 2.5;
      }
    });

  const composedGesture = Gesture.Simultaneous(
    pinchGesture,
    panGesture,
    doubleTapGesture
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
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
        {/* Close button */}
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
          <GestureDetector gesture={composedGesture}>
            <Animated.View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <Animated.Image
                source={{ uri: source }}
                style={[{ width, height, resizeMode: "contain" }, animatedStyle]}
              />
            </Animated.View>
          </GestureDetector>
        ) : (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Video
              source={{ uri: source }}
              style={{ width, height }}
              resizeMode="contain"
              controls
              paused={false}
            />
          </View>
        )}
      </GestureHandlerRootView>
    </Modal>
  );
};

export default Multimedia;
