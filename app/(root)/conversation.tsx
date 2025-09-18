import ConversationHeader from '@/components/ConversationHeader';
import Messages from '@/components/Messages';
import SendChatInput from '@/components/SendChatInput';
import useChat from '@/hooks/useChat';
import useKeyboard from '@/hooks/useKeyboard';
import React from 'react';
import {
  FlatList,
  StyleSheet,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const Conversation = () => {
  const { keyboardHeight } = useKeyboard();
  const { conversations, isLoadingConversations, errorConversations, isErrorConversations } = useChat();

  return (
    <SafeAreaView style={styles.container}>
      <ConversationHeader />
      <View style={styles.messagesContainer}>
        <FlatList
          data={conversations}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Messages data={item} />}
          contentContainerStyle={[styles.contentStyle, {
            flexGrow: 1,
            justifyContent: conversations?.length! > 6 ? "flex-start" : "flex-end",
          }]}
          inverted
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
          bounces={false}
          overScrollMode='never'
        />
      </View>
      <View style={[styles.inputContainer, { paddingBottom: keyboardHeight > 0 ? keyboardHeight : 0 }]}>
        <SendChatInput />
      </View>
    </SafeAreaView>
  )
}

export default Conversation

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  messagesContainer: {
    flex: 1,
  },
  inputContainer: {
    backgroundColor: 'transparent',
  },
  contentStyle: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    paddingTop: 10,
    gap: 15,
  }
})