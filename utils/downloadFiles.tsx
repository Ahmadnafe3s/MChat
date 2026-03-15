import { scheduleDownloadNotification } from "@/notifications/scheduler";
import { Alert } from "react-native";
import * as RNFS from "react-native-fs";

const downloadFile = async ({
  url,
  fileName,
  onProgress,
}: {
  url: string;
  fileName: string;
  onProgress?: (progress: number) => void; // 0 to 100
}) => {
  const downloadDest = `${RNFS.DownloadDirectoryPath}/${fileName}`;
  console.log("Downloading to:", downloadDest);

  let lastProgress = 0;
  const task = RNFS.downloadFile({
    fromUrl: url,
    toFile: downloadDest,
    progressDivider: 1, 
    progress: (res) => {
      let percentage = 0;
      
      if (res.contentLength && res.contentLength > 0) {
        percentage = Math.floor((res.bytesWritten / res.contentLength) * 100);
      } else if (res.bytesWritten > 0) {
        // If contentLength unavailable, gradually increment progress (max 95%)
        percentage = Math.min(95, lastProgress + 1);
      }
      
      percentage = Math.max(0, Math.min(100, percentage));
      lastProgress = percentage;
      
      if (onProgress) onProgress(percentage);
      console.log(`Download progress: ${percentage}%`);
    },
  });

  try {
    await task.promise;
    if (onProgress) onProgress(100);
    await scheduleDownloadNotification(fileName, downloadDest);
  } catch (err: any) {
    Alert.alert("Error", err.message);
  }
};

export default downloadFile;
