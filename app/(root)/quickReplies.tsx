import CustomButton from "@/components/custom-button";
import InputField from "@/components/input-field";
import QuickReplyCard from "@/components/QuickReplyCard";
import SendQuickReply from "@/components/sendQuickReply";
import { icons } from "@/constants";
import useQuickReply from "@/hooks/useQuickReply";
import { quickReplySchema } from "@/utils/formSchema";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Dimensions,
  FlatList,
  Image,
  Keyboard,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";

const width = Dimensions.get("window").width;

const QuickReplies = () => {
  const router = useRouter();
  const { quickReplies, createQuickReply } = useQuickReply({
    afterSuccess: () => setForm(false),
  });
  const [selectedReply, setSelectedReply] = useState<QuickReply | null>(null);

  const [form, setForm] = useState(false);

  const sheetRef = useRef<BottomSheetModal>(null)
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof quickReplySchema>>({
    resolver: zodResolver(quickReplySchema),
    defaultValues: { name: "", content: "" },
  });




  const onSubmit = async (data: z.infer<typeof quickReplySchema>) => {
    createQuickReply.mutate({ name: data.name, content: data.content });
    Keyboard.dismiss();
  };

  return (
    <>
      <SafeAreaView className="bg-white flex-1">
        {/* Header */}
        <View className="flex flex-row p-5 gap-4 mt-1 border-b border-gray-200 items-center justify-between">
          <View className="flex flex-row gap-3 items-center">
            <TouchableOpacity onPress={() => router.back()}>
              <Image source={icons.moveLeft as any} className="w-6 h-6" />
            </TouchableOpacity>
            <Text className="text-xl text-neutral-700 font-JakartaSemiBold">
              Quick Replies
            </Text>
          </View>
          <TouchableOpacity onPress={() => setForm(true)}>
            <Image
              source={icons.add as any}
              className="w-9 h-9"
              tintColor={"#42d6a6"}
            />
          </TouchableOpacity>
        </View>
        {/* Quick Reply List */}
        <FlatList
          data={quickReplies.data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <QuickReplyCard data={item} onSend={() => { setSelectedReply(item); sheetRef.current?.present() }} />
          )}
          initialNumToRender={10}
          maxToRenderPerBatch={5}
          windowSize={10}
          removeClippedSubviews={true}
          contentContainerStyle={styles.contentStyle}
        />
      </SafeAreaView>

      {/* -----------Send Quick Reply---------- */}

      <SendQuickReply ref={sheetRef} selectedReply={selectedReply!} />

      {/* -----------Form Modal---------- */}

      <Modal
        visible={form}
        transparent={true}
        animationType="fade"
        statusBarTranslucent={true}
        onRequestClose={() => setForm(false)}
      >
        <Pressable
          className="relative flex-1 bg-black/20 justify-center items-center"
          onPress={() => setForm(false)}
        >
          <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={20}>
            <Pressable
              className="bg-white p-5 rounded-xl items-center w-64"
              style={{ width: width - 50 }}
              onPress={(e) => e.stopPropagation()}
            >
              <Text className="text-neutral-700 text-2xl font-JakartaBold mt-4">
                Add a quick reply
              </Text>

              {/* -----------Input Field---------- */}
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <InputField
                    label="Name"
                    placeholder="eg: Festival Name"
                    onChangeText={(text) => field.onChange(text)}
                    error={errors.name && errors.name.message}
                    value={field.value}
                    containerStyle="rounded-xl"
                  />
                )}
              />
              <Controller
                control={control}
                name="content"
                render={({ field }) => (
                  <InputField
                    label="Content"
                    placeholder="eg: We are providing you with ..."
                    onChangeText={(text) => field.onChange(text)}
                    error={errors.content && errors.content.message}
                    value={field.value}
                    multiline={true}
                    containerStyle="rounded-xl max-h-40"
                  />
                )}
              />

              <Text className="text-xs self-end text-neutral-400 font-JakartaBold">
                {watch("content").length}/1024
              </Text>

              <CustomButton
                title="Save"
                className="mt-5"
                onPress={handleSubmit(onSubmit)}
                loading={createQuickReply.isPending}
              />
            </Pressable>
          </KeyboardAvoidingView>
        </Pressable>
      </Modal>
    </>
  );
};

export default QuickReplies;

const styles = StyleSheet.create({
  contentStyle: {
    flexGrow: 1,
    backgroundColor: "#f9fafb",
    paddingHorizontal: 10,
    paddingBottom: 20,
    paddingTop: 8,
    gap: 8,
  },
});
