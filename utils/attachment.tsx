import { useToastStore } from "@/store/toast";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

const AudioMimeTypes = [
  "audio/*",
  "audio/aac",
  "audio/mp4",
  "audio/mpeg",
  "audio/amr",
  "audio/ogg",
  "audio/wav",
  "audio/3gpp",
  "audio/x-aac",
  "audio/x-m4a",
];

const DocumentMimeTypes = [
  // Excel
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  // Word
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  // PowerPoint
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  // CSV / Text
  "text/csv",
  "text/plain",
  // PDF
  "application/pdf",
];



export const getImage = async () => {
  const toast = useToastStore.getState();
  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      quality: 0.7, // Using built-in compression to avoid native module rebuild
    });
    if (!result.canceled) {
      const MaxSize = 5 * 1024 * 1024;
      if (result?.assets[0]?.fileSize! > MaxSize) {
        toast.showToast("Max file size 5MB", "error")
        return;
      }
      return result.assets[0];
    }
  } catch (error: any) {
    console.log("Error in Image Picker: ", error);
    Alert.alert("Error", error.message);
  }
};

export const openCamera = async () => {
  const toast = useToastStore.getState();
  try {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      quality: 0.7, // Using built-in compression to avoid native module rebuild
    });
    if (!result.canceled) {
      const MaxSize = 5 * 1024 * 1024;
      if (result?.assets[0]?.fileSize! > MaxSize) {
        toast.showToast("Max file size 5MB", "error")
        return;
      }
      return result.assets[0];
    }
  } catch (error: any) {
    console.log("Error in Camera: ", error);
    Alert.alert("Error", error.message);
  }
};

export const getDocument = async (isOnlyAudio = false) => {
  try {
    const toast = useToastStore.getState();

    const result = await DocumentPicker.getDocumentAsync({
      type: isOnlyAudio ? AudioMimeTypes : DocumentMimeTypes,
    });

    if (!result.canceled) {
      const MaxSize = isOnlyAudio ? 5 * 1024 * 1024 : 100 * 1024 * 1024;
      if (result?.assets[0]?.size! > MaxSize) {
        toast.showToast(`Max file size ${MaxSize / 1024}MB`, "error")
        return;
      }

      return result.assets[0];
    }
  } catch (error: any) {
    console.log("Error in Document Picker: ", error);
    Alert.alert("Error", error.message);
  }
};
