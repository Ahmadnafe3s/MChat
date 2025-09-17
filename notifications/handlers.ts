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

function getMimeType(path: string) {
  if (path.endsWith(".pdf")) return "application/pdf";
  if (path.endsWith(".jpg") || path.endsWith(".jpeg")) return "image/jpeg";
  if (path.endsWith(".png")) return "image/png";
  if (path.endsWith(".mp4")) return "video/mp4";
  return "*/*";
}
