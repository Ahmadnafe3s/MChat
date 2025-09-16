import * as IntentLauncher from "expo-intent-launcher";
import * as Sharing from "expo-sharing";
import { Platform } from "react-native";

export async function handleDownloadTap(data: any) {
  const filePath = data?.path;
  if (!filePath) return;

  if (Platform.OS === "android") {
    try {
      await IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
        data: `file://${filePath}`,
        flags: 1,
        type: getMimeType(filePath),
      });
    } catch (e) {
      console.log("Failed to open file:", e);
    }
  } else {
    await Sharing.shareAsync(filePath);
  }
}

export function handleMessageTap(data: any) {
  if (data?.chatId) {
    // navigate("ChatScreen", { chatId: data.chatId });
  }
}

function getMimeType(path: string) {
  if (path.endsWith(".pdf")) return "application/pdf";
  if (path.endsWith(".jpg") || path.endsWith(".jpeg")) return "image/jpeg";
  if (path.endsWith(".png")) return "image/png";
  if (path.endsWith(".mp4")) return "video/mp4";
  return "*/*";
}
