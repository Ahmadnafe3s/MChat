import CustomButton from '@/components/custom-button'
import QuickReplyCard from '@/components/QuickReplyCard'
import { icons } from '@/constants'
import useQuickReply from '@/hooks/useQuickReply'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { FlatList, Image, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const QuickReplies = () => {
  const router = useRouter();
  const { quickReplies } = useQuickReply()
  const [selectedReply, setSelectedReply] = useState<QuickReply | null>(null)

  console.log(selectedReply)

  return (
    <>
      <SafeAreaView className='bg-white flex-1'>
        <View className='flex flex-row p-5 gap-4 mt-1 border-b border-gray-200 items-center'>
          <TouchableOpacity onPress={() => router.back()}>
            <Image source={icons.moveLeft as any} className="w-6 h-6" />
          </TouchableOpacity>
          <Text className='text-xl text-neutral-700 font-JakartaSemiBold'>Quick Replies</Text>
        </View>
        <FlatList
          data={quickReplies.data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <QuickReplyCard data={item} onSend={() => setSelectedReply(item)} />}
          initialNumToRender={10}
          maxToRenderPerBatch={5}
          windowSize={10}
          removeClippedSubviews={true}
          contentContainerStyle={styles.contentStyle}
        />
      </SafeAreaView>

      <Modal visible={!!selectedReply} transparent={true} animationType="fade" statusBarTranslucent={true}>
        <Pressable className='relative flex-1 bg-black/20 justify-center items-center' onPress={() => setSelectedReply(null)}>

          <View className='bg-white mx-5 p-5 rounded-xl items-center gap-3 '>

            <View className='bg-yellow-100 p-6 rounded-full mt-2'>
              <Image source={icons.failed as any} className="w-20 h-20" tintColor={"#eab308"} />
            </View>

            <Text className='text-lg font-JakartaSemiBold text-neutral-600'>Do you want to send this quick reply?</Text>
            <Text className='text-sm text-neutral-500'>( {selectedReply?.name} )</Text>

            <View className='flex flex-row gap-2 mt-4'>
              <CustomButton
                title='Send'
              />
            </View>


            <TouchableOpacity className='absolute top-4 right-5' onPress={() => setSelectedReply(null)}>
              <Image source={icons.cross as any} className="w-6 h-6" tintColor={"#d1d5db"} />
            </TouchableOpacity>

          </View>

        </Pressable>
      </Modal>
    </>
  )
}

export default QuickReplies



const styles = StyleSheet.create({
  contentStyle: {
    flexGrow: 1,
    backgroundColor: '#f9fafb',
    paddingHorizontal: 10,
    paddingBottom: 20,
    paddingTop: 8,
    gap: 8,
  }
})