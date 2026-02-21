
import CustomAlert from "@/components/Alert";
import ConversationHeader from "@/components/ConversationHeader";
import InitiateCall from "@/components/initiateCall";
import OTPModal from "@/components/InputOTP";
import Messages from "@/components/Messages";
import MessageTemplate from "@/components/MessageTemplate";
import SendChatInput from "@/components/SendChatInput";
import useChat from "@/hooks/useChat";
import useClearChat from "@/hooks/useClearChat";
import useGradualKeyboard from "@/hooks/useGradualKeyboard";
import { useChatStore } from "@/store/chat";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { FlashList } from "@shopify/flash-list";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const Conversation = () => {
  const { height } = useGradualKeyboard();
  const { conversations, isLoadingConversations } = useChat("conversation");
  const [isAtBottom, setIsAtBottom] = useState(true);
  const flashListRef = React.useRef<FlashList<any>>(null);
  const TemplateRef = useRef<BottomSheetModal>(null);
  const { sendOTP, verifyOTP } = useClearChat()
  const [modal, setModal] = useState<'none' | 'call' | 'clearChat' | 'otp'>('none');
  const { selectedChat } = useChatStore()

  console.log(`🚺 USER ID: ${selectedChat?.id} is selected for chat `);

  const keyboardPadding = useAnimatedStyle(() => {
    return { height: height.value };
  }, []);

  const isLessThan6 = conversations?.length! < 6;

  const handleCancelClearChat = () => {
    setModal('none');
  }

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
      {/* -------------- Chat Header --------------- */}
      <ConversationHeader
        onCall={() => setModal('call')}
        onTemplate={() => TemplateRef.current?.present()}
        onClearChat={() => setModal('clearChat')}
      />

      {/* -------------- Flash List --------------- */}
      <FlashList
        ref={flashListRef}
        data={conversations}
        keyExtractor={(item) => String(item?.id)}
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


      {/* -------------- Send Chat Input --------------- */}
      <SendChatInput />


      {/* -------------- Keyboard --------------- */}
      <Animated.View style={keyboardPadding} />


      {/* -------------- Message Template --------------- */}
      <MessageTemplate
        ref={TemplateRef}
        close={() => TemplateRef.current?.close()}
      />

      {/* -------------- Initiate Call --------------- */}

      {modal === 'call' && (
        <InitiateCall onClose={() => setModal('none')} />
      )}


      {/* -------------- Alert --------------- */}


      <CustomAlert
        visible={modal === 'clearChat'}
        title="Clear Chat"
        message="Do you really want clear chat!"
        onContinue={() => sendOTP.mutate("no_params", {
          onSuccess: () => setModal('otp')
        })}
        onCancel={() => setModal('none')}
      />

      {/* -------------- Verify OTP --------------- */}

      <OTPModal
        visible={modal === 'otp'}
        title="Enter Verification Code"
        error={verifyOTP.isError ? verifyOTP?.error?.response?.data?.message : ''}
        onVerify={(otp) => verifyOTP.mutate(Number(otp), {
          onSuccess: () => handleCancelClearChat()
        })}
        onCancel={() => handleCancelClearChat()}
      />
    </SafeAreaView>
  );
};

export default Conversation;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
});
