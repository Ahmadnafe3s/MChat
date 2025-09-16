import * as Notifications from "expo-notifications";
import { handleDownloadTap, handleMessageTap } from "./handlers";

export function setupNotificationListener() {
  return Notifications.addNotificationResponseReceivedListener((response) => {
    const data = response.notification.request.content.data;
    console.log("Notification tapped:", data);

    switch (data?.type) {
      case "download":
        handleDownloadTap(data);
        break;
      case "message":
        handleMessageTap(data);
        break;
      default:
        console.log("Unknown notification type");
    }
  });
}
