import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

export async function setupNotificationConfig() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: true,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });

  // Ask for permissions (iOS and Android 13+ require this)
  const settings = await Notifications.getPermissionsAsync();
  if (!settings.granted) {
    await Notifications.requestPermissionsAsync();
  }

  // (Optional) Create Android channels
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("downloads", {
      name: "Downloads",
      importance: Notifications.AndroidImportance.HIGH,
      sound: "default",
    });

    await Notifications.setNotificationChannelAsync("messages", {
      name: "Messages",
      importance: Notifications.AndroidImportance.MAX,
      sound: "default",
    });
  }
}
