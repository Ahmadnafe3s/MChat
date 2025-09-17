import { Alert } from "react-native";
import FileViewer from "react-native-file-viewer";

export async function handleDownloadTap(data: any) {
  const originalPath = data?.path;
  console.log("Original path:", originalPath);
  if (!originalPath) return;

  try {
    await FileViewer.open(`file://${originalPath}`, {
      showOpenWithDialog: true,
    });
  } catch (error) {
    console.log("Failed to open file:", error);
    Alert.alert("Could not open file");
  }
}
export function handleMessageTap(data: any) {
  if (data?.chatId) {
    // navigate("ChatScreen", { chatId: data.chatId });
  }
}

export function handleReminderTap(data: any) {
  console.log("Reminder tapped:", data);
}
