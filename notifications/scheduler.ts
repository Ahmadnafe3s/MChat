import * as Notifications from "expo-notifications";

export async function scheduleDownloadNotification(
  fileName: string,
  path: string
) {
  return Notifications.scheduleNotificationAsync({
    content: {
      title: "Download Complete",
      body: `${fileName} has been downloaded successfully.`,
      data: { type: "download", path, fileName },
      sound: "default",
    },
    trigger: null,
  });
}

export async function scheduleMessageNotification(
  sender: string,
  chatId: string,
  message: string
) {
  return Notifications.scheduleNotificationAsync({
    content: {
      title: `Message from ${sender}`,
      body: message,
      data: { type: "message", chatId, sender },
      sound: "default",
    },
    trigger: null,
  });
}
