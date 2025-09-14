import ConversationHeader from '@/components/ConversationHeader';
import Messages from '@/components/Messages';
import SendChatInput from '@/components/SendChatInput';
import { conversations } from '@/constants';
import useKeyboard from '@/hooks/useKeyboard';
import { useAuthStore } from '@/store/auth';
import React from 'react';
import {
  FlatList,
  StyleSheet,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const Conversation = () => {
  const { user } = useAuthStore();
  const { keyboardHeight } = useKeyboard();

  return (
    <SafeAreaView style={styles.container}>
      <ConversationHeader />
      <View style={styles.messagesContainer}>
        <FlatList
          data={conversations}
          keyExtractor={(item) => item?.id?.toString()}
          renderItem={({ item }) => <Messages data={item} senderId={user?.id!} />}
          contentContainerStyle={styles.contentStyle}
          inverted
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
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