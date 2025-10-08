import { icons } from "@/constants";
import downloadFile from "@/utils/downloadFiles";
import React, { memo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Video, { VideoRef } from "react-native-video";
import { ClickableText } from "./ClickableLink";
import Multimedia from "./Multimedia";

const { width: screenWidth } = Dimensions.get("window");
const maxMediaWidth = screenWidth * 0.7; // 70% of screen width
const minMediaWidth = 200;

interface MediaType {
  type: "image" | "video";
  source: string;
  visible: boolean;
}

const Messages = memo(({ data }: { data: Conversations }) => {
  const isSender = data.message_type === "user";
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const playerRef = useRef<VideoRef | null>(null);
  const [paused, setPaused] = useState(false);
  const [media, setMedia] = useState<MediaType>({
    type: "image",
    source: "",
    visible: false,
  });

  const handleDownload = async () => {
    if (!data?.header?.link) return;

    setIsDownloading(true);
    setDownloadProgress(0);

    try {
      await downloadFile({
        url: data.header.link,
        fileName: `Document-${Date.now()}.${data.header.format}`,
        onProgress: (progress) => {
          setDownloadProgress(progress);
        },
      });
    } catch (error) {
      Alert.alert("Error", "Failed to download file");
      console.error("Download error:", error);
    } finally {
      setIsDownloading(false);
      setDownloadProgress(0);
    }
  };

  const renderMedia = () => {
    if (!data?.header) return null;
    const { format, link } = data.header;

    if (format === "png" || format === "jpg" || format === "jpeg") {
      return (
        <View className={`p-3 ${data?.body?.text && "border-b border-neutral-200"}`}>
          <TouchableOpacity
            onPress={() =>
              setMedia({ type: "image", source: link, visible: true })
            }
            className=" rounded-lg overflow-hidden  w-full aspect-[4/3]"
          >
            <Image
              source={{ uri: link.trim() }}
              className=" size-full"
              resizeMode="cover"
            />
            {/* Image overlay for better UX */}
            <View className="absolute inset-0 bg-black/5" />
          </TouchableOpacity>
        </View>
      );
    }

    if (format === "mp4") {
      return (
        <View className={`p-3 ${data?.body?.text && "border-b border-neutral-200"}`}>
          <TouchableOpacity
            onPress={() =>
              setMedia({ type: "video", source: link, visible: true })
            }
            className="relative overflow-hidden rounded-lg border-b border-neutral-200 w-full aspect-[4/3]"
          >
            <Video
              source={{ uri: link.trim() }}
              style={{
                width: "100%",
                height: "100%"
              }}
              muted={true}
              paused={true}
              repeat={false}
              resizeMode="cover"
              className="rounded-lg"
            />
            {/* Video overlay */}
            <View className="absolute inset-0 bg-black/20 rounded-lg" />
            {/* Play button */}
            <View className="absolute inset-0 items-center justify-center">
              <View className="w-16 h-16 bg-black/50 rounded-full items-center justify-center">
                <Image
                  source={icons.play as any}
                  className="w-8 h-8 ml-1"
                  tintColor="#ffffff" // TODO: change to blue
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    }

    if (format === "ogg" || format === "mp3") {
      return (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: isSender ? "#ecfdf5" : "white",
            borderRadius: 12,
            padding: 10,
            minWidth: 200,
          }}
        >
          <View
            className={`p-2.5 rounded-full ${isSender ? "bg-white" : "bg-emerald-50"}`}
          >
            <Image
              source={icons.audio as any}
              style={{ width: 30, height: 30 }}
            />
          </View>

          <Text style={{ flex: 1, marginLeft: 10, color: "#111827" }}>
            Voice message
          </Text>

          <TouchableOpacity
            onPress={() => {
              setPaused((prev) => !prev);
            }}
          >
            <Image
              source={paused ? icons.pause : (icons.play as any)}
              style={{ width: 20, height: 20, tintColor: "#303030" }}
            />
          </TouchableOpacity>

          <Video
            ref={playerRef as any}
            source={{ uri: link.trim() }}
            paused={!paused}
            playInBackground
            ignoreSilentSwitch="ignore"
            onEnd={() => {
              setPaused(false);
              playerRef?.current?.seek(0);
            }}
            volume={1.0}
            style={{ width: 0, height: 0 }} // hidden for audio-only
          />
        </View>
      );
    }

    if (
      format === "pdf" ||
      format === "csv" ||
      format === "xlsx" ||
      format === "pptx" ||
      format === "docx"
    ) {
      return (
        <View className={`p-4 min-w-[250px] ${data?.body?.text && "border-b border-neutral-200"}`}>
          <View className="flex-row items-center mb-3">
            <View className="w-10 h-10 bg-red-100 rounded-lg items-center justify-center mr-3">
              <Text className="text-red-600 text-xs font-bold uppercase">
                {format}
              </Text>
            </View>
            <View className="flex-1">
              <Text
                className="text-gray-800 font-medium text-sm"
                numberOfLines={1}
              >
                Document.{format}
              </Text>
              <Text className="text-gray-500 text-xs capitalize">
                {format} Document
              </Text>
            </View>
          </View>

          {/* Download Progress */}
          {isDownloading && (
            <View className="mb-3">
              <View className="flex-row justify-between items-center mb-1">
                <Text className="text-xs text-gray-600">Downloading...</Text>
                <Text className="text-xs text-gray-600">
                  {Math.round(downloadProgress)}%
                </Text>
              </View>
              <View className="h-1 bg-gray-200 rounded-full overflow-hidden">
                <View
                  className="h-full bg-blue-500 rounded-full transition-all duration-300"
                  style={{ width: `${downloadProgress}%` }}
                />
              </View>
            </View>
          )}

          {/* Download Button */}
          <TouchableOpacity
            onPress={handleDownload}
            disabled={isDownloading}
            className={`flex-row items-center justify-center py-2 px-4 rounded-lg ${isDownloading
              ? "bg-gray-300"
              : isSender
                ? "bg-gray-500"
                : "bg-blue-500"
              }`}
          >
            {isDownloading ? (
              <ActivityIndicator size="small" color="#666" />
            ) : (
              <Image
                source={icons.download as any}
                className="w-4 h-4 mr-2"
                tintColor={isSender ? "#ffffff" : "#ffffff"}
              />
            )}
            <Text
              className={`font-medium text-sm ${isDownloading
                ? "text-gray-600"
                : isSender
                  ? "text-white"
                  : "text-white"
                }`}
            >
              {isDownloading ? "Downloading..." : "Download"}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    return null;
  };

  return (
    <>
      {/* ---------------- Assigned To Label --------------- */}
      {
        data?.message_type === "label" ? (
          <View className="flex items-center my-3">
            <View className="rounded-full bg-neutral-100 py-1 px-4 elevation-sm">
              <Text className="text-sm text-neutral-500">{data.text}</Text>
              <Text className={`text-xs font-normal mr-1 text-center text-gray-400`}>
                {new Date(data?.datetime).toLocaleTimeString([], {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </View>
          </View>
        ) : (
          <View
            className={`flex flex-row items-end my-2 ${isSender ? "justify-end" : "justify-start"
              } px-4 mb-3`}
          >
            <View
              className={`flex max-w-[85%]  relative ${isSender ? "items-end" : "items-start"}`}
            >
              {/* Message bubble */}
              <View
                className={` relative bg-white overflow-hidden rounded-2xl elevation-sm`}>
                {/* Media content */}
                {renderMedia()}

                {/* Text content */}
                {data?.body?.text && (
                  <View className={`px-4 py-3  ${isSender ? "bg-emerald-50" : "bg-neutral-50"}`}>
                    <ClickableText
                      text={data.body?.text}
                      style={{
                        color: isSender ? "#1f2937" : "#374151",
                        fontSize: 15,
                        lineHeight: 20,
                      }}
                      linkStyle={{ color: "blue" }}
                    />
                  </View>
                )}

                {/* Message Footer */}

                {data.footer && (
                  <View className="px-3 border-t border-neutral-200 pt-1 pb-3">
                    <Text className="text-xs text-gray-400 font-Jakarta">
                      {data?.footer}
                    </Text>
                  </View>
                )}

                {data.button.length > 0 && (
                  <View className={`flex gap-2 items-center px-3 mb-4 ${!data?.footer && "pt-3 border-t border-neutral-200"}`}>
                    {data?.button.map((button, index) => (
                      <TouchableOpacity
                        key={index}
                        className={` w-full py-2.5 px-4 items-center justify-center border border-emerald-400 rounded-xl`}
                      >
                        <Text className={`font-medium text-sm text-emerald-500`}>
                          {button?.text}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>

              {/* Timestamp and status */}
              <View
                className={`flex-row items-center justify-end mt-1
           }`}
              >
                <Text className={`text-xs font-normal mr-1 text-gray-400`}>
                  {new Date(data?.datetime).toLocaleTimeString([], {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
                {isSender && (
                  <Image
                    source={
                      data.status === "failed"
                        ? icons.failed
                        : data.status === "read"
                          ? icons.doubleCheck
                          : (icons.check as any)
                    }
                    className="w-4 h-4"
                    tintColor={
                      data?.status === "failed"
                        ? "red"
                        : data?.status === "read"
                          ? "#27f5a9"
                          : "#A3A3A3"
                    }
                  />
                )}
              </View>
            </View>
          </View>
        )
      }

      <Multimedia
        source={media?.source!}
        type={media?.type!}
        visible={media?.visible!}
        onClose={() => setMedia({ type: "image", source: "", visible: false })}
      />
    </>
  );
});

Messages.displayName = "Messages";

export default Messages;
