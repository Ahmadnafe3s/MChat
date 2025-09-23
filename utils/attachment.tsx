import * as DocumentPicker from 'expo-document-picker'
import * as ImagePicker from 'expo-image-picker'
import { Alert } from 'react-native'



const AudioMimeTypes = [
    'audio/aac',
    'audio/mpeg',
    'audio/mp4',
    'audio/wav',
    'audio/mp3',
    'audio/x-aac',
]


const DocumentMimeTypes = [
    // Excel
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    // Word
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    // PowerPoint
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    // CSV / Text
    'text/csv',
    'text/plain',
    // PDF
    'application/pdf',
]


export const getImage = async () => {
    try {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', "videos"],
            allowsEditing: true,
            quality: 1,
        })
        if (!result.canceled) {
            return result.assets[0]
        }
    } catch (error: any) {
        console.log('Error in Image Picker: ', error)
        Alert.alert('Error', error.message)
    }
}


export const getDocument = async (isOnlyAudio = false) => {
    try {
        const result = await DocumentPicker.getDocumentAsync({
            type: isOnlyAudio ? AudioMimeTypes : DocumentMimeTypes,
        })
        if (!result.canceled) {
            return result.assets[0]
        }
    } catch (error: any) {
        console.log('Error in Document Picker: ', error)
        Alert.alert('Error', error.message)
    }
}