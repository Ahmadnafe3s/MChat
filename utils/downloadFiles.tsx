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

  const task = RNFS.downloadFile({
    fromUrl: url,
    toFile: downloadDest,
    progressDivider: 1, // update callback for every 1% (can set higher to reduce calls)
    progress: (res) => {
      const percentage = Math.floor(
        (res.bytesWritten / res.contentLength) * 100
      );
      if (onProgress) onProgress(percentage);
      console.log(`Download progress: ${percentage}%`);
    },
  });

  try {
    await task.promise;
    scheduleDownloadNotification(fileName, downloadDest);
  } catch (err: any) {
    Alert.alert("Error", err.message);
  }
};

export default downloadFile;
