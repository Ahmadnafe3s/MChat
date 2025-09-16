import { icons } from "@/constants";
import downloadFile from "@/utils/downloadFiles";
import React, { memo, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    Image,
    Modal,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Video from "react-native-video";

const { width: screenWidth } = Dimensions.get("window");
const maxMediaWidth = screenWidth * 0.7; // 70% of screen width
const minMediaWidth = 200;

const Messages = memo(({ data }: { data: Conversations }) => {
  const isSender = data.message_type === "user";
  const [videoVisible, setVideoVisible] = useState(false);
  const [imageVisible, setImageVisible] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

  // Calculate media dimensions with aspect ratio preservation
  const getMediaDimensions = (aspectRatio = 4 / 3) => {
    const calculatedWidth = Math.min(
      Math.max(minMediaWidth, maxMediaWidth),
      maxMediaWidth
    );
    const calculatedHeight = calculatedWidth / aspectRatio;
    return { width: calculatedWidth, height: Math.min(calculatedHeight, 400) };
  };

  const mediaDimensions = getMediaDimensions();

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
      Alert.alert("Success", "File downloaded successfully!");
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
        <TouchableOpacity
          onPress={() => setImageVisible(true)}
          className="overflow-hidden rounded-lg"
          style={mediaDimensions}
        >
          <Image
            source={{ uri: link.trim() }}
            style={mediaDimensions}
            className="rounded-lg"
            resizeMode="cover"
          />
          {/* Image overlay for better UX */}
          <View className="absolute inset-0 bg-black/5" />
        </TouchableOpacity>
      );
    }

    if (format === "mp4") {
      return (
        <TouchableOpacity
          onPress={() => setVideoVisible(true)}
          className="relative overflow-hidden rounded-lg"
          style={mediaDimensions}
        >
          <Video
            source={{ uri: link.trim() }}
            style={mediaDimensions}
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
      );
    }

    if (
      format === "pdf" ||
      format === "csv" ||
      format === "xlsx" ||
      format === "pptx"
    ) {
      return (
        <View className="bg-gray-50 rounded-lg p-4 min-w-[250px]">
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
            className={`flex-row items-center justify-center py-2 px-4 rounded-lg ${
              isDownloading
                ? "bg-gray-300"
                : isSender
                  ? "bg-white/20"
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
              className={`font-medium text-sm ${
                isDownloading
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
      <View
        className={`flex flex-row items-end ${
          isSender ? "justify-end" : "justify-start"
        } px-4 mb-3`}
      >
        <View
          className={`flex max-w-[85%]  ${isSender ? "items-end" : "items-start"}`}
        >
          {/* Message bubble */}
          <View
            className={`px-3 py-2 elevation ${
              isSender
                ? "bg-[#00d793] rounded-tl-[18px] rounded-tr-[18px] rounded-bl-[18px] rounded-br-[4px]"
                : "bg-white rounded-tr-[18px] rounded-tl-[18px] rounded-br-[18px] rounded-bl-[4px]"
            }`}
          >
            {/* Media content */}
            {data?.header && renderMedia()}

            {/* Text content */}
            {data.body.text && (
              <View className={data?.header ? "mt-2" : ""}>
                <Text
                  className={`${
                    isSender ? "text-white" : "text-gray-800"
                  } text-[15px] leading-5`}
                  selectable
                >
                  {data.body.text}
                </Text>
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
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
            {isSender && (
              <Image
                source={
                  data.status === "read"
                    ? icons.doubleCheck
                    : (icons.check as any)
                }
                className="w-4 h-4"
                tintColor={data.status === "read" ? "#27f5a9" : "#A3A3A3"}
              />
            )}
          </View>
        </View>
      </View>

      {/* Image Full Screen Modal */}
      <Modal
        visible={imageVisible}
        transparent={true}
        onRequestClose={() => setImageVisible(false)}
        statusBarTranslucent
      >
        <View style={{ flex: 1, backgroundColor: "#000" }}>
          <TouchableOpacity
            onPress={() => setImageVisible(false)}
            className="h-10 w-10 items-center justify-center"
            style={{
              zIndex: 10,
              position: "absolute",
              top: 50,
              left: 20,
              backgroundColor: "rgba(0,0,0,0.5)",
              borderRadius: 20,
            }}
          >
            <Image
              source={icons.moveLeft as any}
              tintColor={"#ffffff"}
              className="h-6 w-6"
            />
          </TouchableOpacity>
          <Image
            source={{ uri: data.header?.link.trim() }}
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "contain",
            }}
          />
        </View>
      </Modal>

      {/* Video Full Screen Modal */}
      <Modal
        visible={videoVisible}
        transparent={true}
        onRequestClose={() => setVideoVisible(false)}
        statusBarTranslucent
      >
        <View style={{ flex: 1, backgroundColor: "#000" }}>
          <TouchableOpacity
            onPress={() => setVideoVisible(false)}
            className="h-10 w-10 items-center justify-center"
            style={{
              zIndex: 10,
              position: "absolute",
              top: 50,
              left: 20,
              backgroundColor: "rgba(0,0,0,0.5)",
              borderRadius: 20,
            }}
          >
            <Image
              source={icons.moveLeft as any}
              tintColor={"#ffffff"}
              className="h-6 w-6"
            />
          </TouchableOpacity>
          <Video
            source={{ uri: data.header?.link.trim() }}
            style={{ width: "100%", height: "100%" }}
            resizeMode="contain"
            controls={true}
            paused={false}
          />
        </View>
      </Modal>
    </>
  );
});

Messages.displayName = "Messages";

export default Messages;
