import AudioPickerModal, { AudioAsset } from "@/components/AudioPickerModal";
import MessageTemplate from "@/components/MessageTemplate";
import { icons } from "@/constants";
import useChat from "@/hooks/useChat";
import useTemplate from "@/hooks/useTemplate";
import { useChatStore } from "@/store/chat";
import { getDocument, getImage, openCamera } from "@/utils/attachment";
import bytesToMB from "@/utils/sizeConverter";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";

import {
  Image,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export type Message = {
  type: "text" | "gallery" | "audio" | "document";
  message: string;
  attachment?: {
    uri: string;
    type: string;
    name: string;
    size: number;
  } | null;
};

const SendChatInput = () => {
  const router = useRouter();
  const { sendMessage } = useChat();
  const { selectedChat } = useChatStore();
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState<Message>({
    type: "text",
    message: "",
    attachment: null,
  });

  const { sendTemplate } = useTemplate()


  const TemplateRef = useRef<BottomSheetModal>(null);
  const AudioPickerRef = useRef<BottomSheetModal>(null);


  // ----------------------Handling Attachment--------------------
  const handleAttachmentOption = async (type: string) => {
    setShowModal(false);
    switch (type) {
      case "document":
        const document = await getDocument();
        if (!document) return;
        setMessage((prev) => ({
          ...prev,
          type: "document",
          attachment: {
            uri: document.uri,
            type: document.mimeType!,
            name: document.name!,
            size: document.size!,
          },
        }));
        break;
      case "gallery":
        const image = await getImage();
        if (!image) return;
        setMessage((prev) => ({
          ...prev,
          type: "gallery",
          attachment: {
            uri: image.uri,
            type: image.mimeType!,
            name: image.fileName!,
            size: image.fileSize!,
          },
        }));
        break;
      case "camera":
        const capture = await openCamera();
        if (!capture) return;
        setMessage((prev) => ({
          ...prev,
          type: "gallery",
          attachment: {
            uri: capture.uri,
            type: capture.mimeType!,
            name: capture.fileName!,
            size: capture.fileSize!,
          },
        }));
        break;
      case "audio":
        AudioPickerRef.current?.present();
        break;
      case "bot":
        console.log("Bot");
        break;
      case "template":
        TemplateRef.current?.present();
        break;
      case "quickReply":
        router.push("quickReplies");
        break;
    }
  };

  const handleAudioSelect = (asset: AudioAsset) => {
    setMessage((prev) => ({
      ...prev,
      type: "audio",
      attachment: {
        uri: asset.uri,
        type: asset.mimeType,
        name: asset.filename,
        size: asset.size,
      },
    }));
  };

  const handleSendTemplate = (data: SendTemplate) => {
    sendTemplate.mutate(data, {
      onSuccess: () => {
        TemplateRef.current?.close()
      }
    })
  }

  // ----------------------Mutation--------------------
  const handleSend = async () => {
    const formData = new FormData();
    formData.append("type", message.type);
    formData.append("message", message.message);
    if (message.attachment) {
      formData.append("attachment", {
        uri: message.attachment.uri,
        name: message.attachment.name,
        type: message.attachment.type,
      } as any);
    }
    await sendMessage({ receiverId: selectedChat?.id!, data: formData });
    setMessage({ message: "", attachment: null, type: "text" });
  };


  // ---------------------Attachment Options--------------------
  const attachmentOptions = [
    {
      type: "camera",
      icon: icons.camera || icons.clip,
      label: "Camera",
      color: "#FF4D4D",
    },
    {
      type: "gallery",
      icon: icons.gallery || icons.clip,
      label: "Gallery",
      color: "#10B981",
    },
    {
      type: "document",
      icon: icons.document || icons.clip,
      label: "Document",
      color: "#7C3AED",
    },
    {
      type: "audio",
      icon: icons.audio || icons.clip,
      label: "Audio",
      color: "#F59E0B",
    },
    {
      type: "quickReply",
      icon: icons.flash || icons.clip,
      label: "Quick Reply",
      color: "#ff3b3b",
    },
    {
      type: "bot",
      icon: icons.bot || icons.clip,
      label: "Bot",
      color: "#000000",
    },
    {
      type: "template",
      icon: icons.template || icons.clip,
      label: "Template",
      color: "#008eff",
    },
  ];


  // ---------------------Checking Status--------------------
  if (selectedChat?.status === "Expired" || selectedChat?.status === "Blocked" || selectedChat?.status === "Create") {
    return (
      <>
        <View className={`flex flex-row items-center gap-2 justify-between ${selectedChat?.status === "Blocked" ? "bg-red-50" : "bg-yellow-50"}  px-4 pt-4 pb-6 rounded-lg -mb-3`}>
          <View className="flex flex-row gap-2">
            <Image
              source={icons.watch as any}
              className="w-5 h-5"
              tintColor={selectedChat?.status === "Blocked" ? "#ef4444" : "#eab308"}
            />
            <Text className={`text-center text-sm font-JakartaBold ${selectedChat?.status === "Blocked" ? "text-red-500" : "text-yellow-500"}`}>
              {selectedChat?.status === "Expired"
                ? "Chat Has Been Expired"
                : selectedChat.status === "Create"
                  ? "To start conversation send a template"
                  : "Chat Has Been Blocked"}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => TemplateRef.current?.present()}
            className="bg-blue-500 px-4 py-2 rounded-lg"
          >
            <Text className="text-white text-sm font-JakartaBold">Send Template</Text>
          </TouchableOpacity>
        </View>

        <MessageTemplate
          ref={TemplateRef}
          isLoading={sendTemplate.isPending}
          onSend={handleSendTemplate}
        />
      </>
    );
  }

  return (
    <>
      {/* Attachment Preview */}
      {message.attachment && (
        <View className="mx-3 px-3 py-2 bg-emerald-50 rounded-lg flex flex-row items-center gap-1">
          <View className="w-16 h-16 bg-red-100 rounded-lg items-center justify-center mr-3">
            {message.attachment?.type.includes("image") ? (
              <Image
                source={{ uri: message.attachment?.uri }}
                className="h-full w-full rounded-lg"
              />
            ) : (
              <Text className="text-red-600 text-lg font-bold uppercase">
                {message.attachment?.type.split("/")[1]}
              </Text>
            )}
          </View>
          <View className="flex gap-0.5 flex-1 mr-4">
            <Text
              className="font-JakartaSemiBold text-gray-700"
              numberOfLines={1}
            >
              {message.attachment?.name}
            </Text>
            <Text className="text-gray-400 text-xs">
              {bytesToMB(message.attachment?.size!)}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              setMessage((prev) => ({ ...prev, attachment: null }))
            }
          >
            <Text className="text-gray-500 text-lg mr-1">✕</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Send Message Input */}
      <View className="px-3 mb-3 pt-3 flex flex-row gap-2 items-start">
        <TouchableOpacity
          className="bg-[#42d6a624] rounded-full mt-1.5 p-3"
          onPress={() => setShowModal(true)}
        >
          <Image
            source={icons.clip as any}
            className="w-6 h-6"
            tintColor={"#42d6a6"}
          />
        </TouchableOpacity>

        <View className="bg-white rounded-3xl px-4 flex-1 border border-gray-200 flex flex-row gap-2">
          <TextInput
            placeholder="Type a message"
            className="py-4 flex-1 text-lg max-h-40"
            multiline
            placeholderTextColor={"#A3A3A3"}
            value={message.message}
            onChangeText={(text) =>
              setMessage((prev) => ({ ...prev, message: text }))
            }
          />
          <TouchableOpacity
            disabled={!message.message && !message.attachment}
            className={`rounded-full size-12 flex items-center justify-center mt-auto mb-1.5 
                        ${!message.message && !message.attachment ? "bg-gray-200" : "bg-[#42d6a624]"}`}
            onPress={handleSend}
          >
            <Image
              source={icons.send as any}
              className="w-6 h-6"
              tintColor={!message.message && !message.attachment ? "#A3A3A3" : "#42d6a6"}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Attachment Modal */}
      <Modal visible={showModal} transparent={true} animationType="fade">
        <View className="flex-1 justify-end">
          <TouchableOpacity
            activeOpacity={1}
            className="bg-neutral-100 rounded-t-3xl p-6 pb-8`"
            onPress={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <View className="flex flex-row justify-between items-center mb-6">
              <Text className="text-xl font-semibold text-gray-800">
                Share Content
              </Text>
              <TouchableOpacity
                onPress={() => setShowModal(false)}
                className="p-2"
              >
                <Text className="text-gray-500 text-lg">✕</Text>
              </TouchableOpacity>
            </View>

            {/* Attachment Options Grid */}
            <View className="flex flex-row flex-wrap justify-between">
              {attachmentOptions.map((option, index) => (
                <TouchableOpacity
                  key={option.type}
                  className="w-[30%] items-center mb-6"
                  onPress={() => handleAttachmentOption(option.type)}
                >
                  <View
                    className="w-16 h-16 rounded-full items-center justify-center mb-2"
                    style={{ backgroundColor: `${option.color}20` }}
                  >
                    <Image
                      source={option.icon as any}
                      className="w-7 h-7"
                      tintColor={option.color}
                    />
                  </View>
                  <Text className="text-sm text-gray-700 text-center">
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </View>
      </Modal>

      <MessageTemplate
        ref={TemplateRef}
        isLoading={sendTemplate.isPending}
        onSend={handleSendTemplate}
      />

      <AudioPickerModal
        ref={AudioPickerRef}
        onSelect={handleAudioSelect}
      />
    </>
  );
};

export default SendChatInput;
