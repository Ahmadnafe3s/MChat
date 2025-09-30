import ConversationHeader from "@/components/ConversationHeader";
import Messages from "@/components/Messages";
import SendChatInput from "@/components/SendChatInput";
import useChat from "@/hooks/useChat";
import useGradualKeyboard from "@/hooks/useGradualKeyboard";
import { FlashList } from "@shopify/flash-list";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const Conversation = () => {
  const { height } = useGradualKeyboard();
  const { conversations, isLoadingConversations } = useChat("conversation");
  const [isAtBottom, setIsAtBottom] = useState(true);
  const flashListRef = React.useRef<FlashList<any>>(null);

  const keyboardPadding = useAnimatedStyle(() => {
    return { height: height.value };
  }, []);

  const isLessThan6 = conversations?.length! < 6;

  useEffect(() => {
    if (!isAtBottom && conversations?.length! > 0) {
      flashListRef.current?.scrollToIndex({
        index: 0, // because list is inverted
        animated: true,
      });
    }
  }, [conversations]);

  return (
    <SafeAreaView style={styles.container}>
      <ConversationHeader />
      <FlashList
        ref={flashListRef}
        data={conversations}
        keyExtractor={(item) => item?.id?.toString()}
        renderItem={({ item }) => <Messages data={item} />}
        inverted
        estimatedItemSize={94}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        overrideProps={{
          contentContainerStyle: {
            flexGrow: isLessThan6 ? 1 : 0,
            paddingBottom: 10,
            paddingTop: 10,
            justifyContent: isLessThan6 ? "flex-end" : "flex-start",
          },
        }}
        onScroll={(e) => {
          const offsetY = e.nativeEvent.contentOffset.y;
          const atBottom = offsetY < 100;
          // if we are not at bottom then will be trigger and set (false)
          if (isAtBottom !== atBottom) setIsAtBottom(atBottom);
        }}
        scrollEventThrottle={16}
        ListEmptyComponent={
          <>
            {isLoadingConversations && <View>
              <ActivityIndicator style={{ marginVertical: 50 }} color={"#34d399"} size={22} />
            </View>}
          </>
        }
      />
      <SendChatInput />
      <Animated.View style={keyboardPadding} />
    </SafeAreaView>
  );
};

export default Conversation;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
});
