import useChat from '@/hooks/useChat';
import { useChatStore } from '@/store/chat';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import React, { forwardRef, useMemo } from 'react';
import { Text, View } from 'react-native';
import CustomButton from './custom-button';

interface Props {
    selectedReply: QuickReply
}

const SendQuickReply = forwardRef<BottomSheetModal, Props>(({ selectedReply }, ref) => {
    const points = useMemo(() => (["40%", "60%", "80%"]), [])
    const { selectedChat } = useChatStore();
    const { sendMessage } = useChat();
    const router = useRouter();

    const onSend = () => {
        if (!selectedReply) return;
        const formdata = new FormData();
        formdata.append("type", "text");
        formdata.append("message", selectedReply?.content);
        sendMessage({ receiverId: selectedChat?.id!, data: formdata });
        router.back();
    };


    const renderBackdrop = React.useCallback((props: any) => (
        <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            opacity={0.5}
        />
    ), []);

    return (
        <BottomSheetModal
            ref={ref}
            index={0}
            snapPoints={points}
            enablePanDownToClose
            enableDynamicSizing={false}
            backdropComponent={renderBackdrop}
        >
            <>
                <View className='px-4 pb-2 pt-4' >
                    <View className='flex flex-row items-start justify-between mb-4'>
                        <Text className='text-xl font-JakartaBold text-neutral-800'>Quick Reply Preview</Text>
                    </View>
                </View>

                <View className='flex-1 mx-5'>
                    <BottomSheetScrollView>
                        <View className='mb-4 p-4 border bg-amber-50 border-amber-200 rounded-xl'>
                            <Text className='text-amber-600 font-Jakarta flex-shrink' numberOfLines={1} ellipsizeMode='tail'>{selectedReply?.name}</Text>
                        </View>
                        <View className='bg-emerald-50 rounded-2xl p-4 elevation-sm '>
                            <Text>{selectedReply?.content}</Text>
                        </View>
                        <View className="flex flex-row gap-2 mt-4 ">
                            <CustomButton title="Send" onPress={onSend} />
                        </View>
                    </BottomSheetScrollView>
                </View>
            </>
        </BottomSheetModal>
    )
})

export default SendQuickReply