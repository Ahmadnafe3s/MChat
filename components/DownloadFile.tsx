import React from 'react';
import { Alert, Button, PermissionsAndroid, Platform, View } from 'react-native';
import RNFS from 'react-native-fs';

const DownloadDocument = ({ url, fileName }: { url: string, fileName: string }) => {

    const requestAndroidPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'Storage Permission Required',
                    message: 'This app needs access to your storage to download files.',
                    buttonPositive: 'OK',          // <-- REQUIRED
                    buttonNegative: 'Cancel',      // optional
                    buttonNeutral: 'Ask Me Later'  // optional
                }
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err: any) {
            Alert.alert('Permission error', err.message);
            return false;
        }
    };

    const downloadFile = async () => {
        if (Platform.OS === 'android') {
            const hasPermission = await requestAndroidPermission();
            if (!hasPermission) return;
        }
        const downloadDest = `${RNFS.DocumentDirectoryPath}/${fileName}`;

        RNFS.downloadFile({
            fromUrl: url,
            toFile: downloadDest,
        }).promise
            .then(() => {
                Alert.alert('Success', 'File downloaded successfully');
            })
            .catch(err => {
                Alert.alert('Error', err.message);
            });
    };

    return (
        <View>
            <Button title="Download Document" onPress={downloadFile} />
        </View>
    );
};

export default DownloadDocument;
