import ConversationHeader from "@/components/ConversationHeader";
import Messages from "@/components/Messages";
import SendChatInput from "@/components/SendChatInput";
import useChat from "@/hooks/useChat";
import useGradualKeyboard from "@/hooks/useGradualKeyboard";
import { FlashList } from "@shopify/flash-list";
import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const Conversation = () => {
  const { height } = useGradualKeyboard();
  const { conversations } = useChat("conversation");

  const keyboardPadding = useAnimatedStyle(() => {
    return { height: height.value };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ConversationHeader />
      <View style={styles.messagesContainer}>
        <FlashList
          data={conversations}
          keyExtractor={(item) => item?.id?.toString()}
          renderItem={({ item }) => <Messages data={item} />}
          inverted
          // Chat-friendly scrolling: preserve visible content when new items load
          maintainVisibleContentPosition={{
            minIndexForVisible: 1,
            autoscrollToTopThreshold: 50, // helpful with inverted lists
          }}
          estimatedItemSize={72}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
        />
      </View>
      <SendChatInput />
      <Animated.View style={keyboardPadding} />
    </SafeAreaView>
  );
};

export default Conversation;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  messagesContainer: { flex: 1 },
  inputContainer: { backgroundColor: "transparent" },
  contentStyle: { paddingHorizontal: 10, paddingBottom: 10, paddingTop: 10, gap: 15 },
});
