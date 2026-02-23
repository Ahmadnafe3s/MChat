import { icons } from "@/constants";
import bytesToMB from "@/utils/sizeConverter";
import { BottomSheetBackdrop, BottomSheetFlatList, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import * as MediaLibrary from "expo-media-library";
import React, { forwardRef, useCallback, useEffect, useState } from "react";
import {
    ActivityIndicator,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export type AudioAsset = {
    uri: string;
    filename: string;
    size: number;
    mimeType: string;
};

interface AudioPickerModalProps {
    onSelect: (asset: AudioAsset) => void;
}

const AudioPickerModal = forwardRef<BottomSheetModal, AudioPickerModalProps>(
    ({ onSelect }, ref) => {
        const [assets, setAssets] = useState<MediaLibrary.Asset[]>([]);
        const [loading, setLoading] = useState(false);
        const [search, setSearch] = useState("");
        const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

        const fetchAudios = useCallback(async () => {
            setLoading(true);
            try {
                if (permissionResponse?.status !== "granted") {
                    const { status } = await requestPermission();
                    if (status !== "granted") return;
                }

                const { assets: fetchedAssets } = await MediaLibrary.getAssetsAsync({
                    mediaType: "audio",
                    sortBy: [[MediaLibrary.SortBy.creationTime, false]],
                    first: 1000, // Fetch up to 1000 audios for now
                });

                // We need extra info (size, mimeType) for some assets
                // Note: MediaLibrary.getAssetInfoAsync is slow for many assets, 
                // so we'll fetch basic info first.
                setAssets(fetchedAssets);
            } catch (error) {
                console.error("Error fetching audios:", error);
            } finally {
                setLoading(false);
            }
        }, [permissionResponse, requestPermission]);

        useEffect(() => {
            if (permissionResponse?.status === "granted") {
                fetchAudios();
            } else if (permissionResponse?.canAskAgain) {
                requestPermission();
            }
        }, [permissionResponse]);

        const handleSelect = async (asset: MediaLibrary.Asset) => {
            setLoading(true);
            try {
                const info = await MediaLibrary.getAssetInfoAsync(asset);
                onSelect({
                    ...info,
                    uri: info.localUri || info.uri,
                    filename: info.filename,
                    size: asset.duration > 0 ? (asset.width || 0) : (asset.height || 0),
                    mimeType: "audio/mpeg",
                } as any);
            } catch (error) {
                console.error("Error getting asset info:", error);
            } finally {
                setLoading(false);
                // @ts-ignore
                ref?.current?.close();
            }
        };

        const renderBackdrop = useCallback(
            (props: any) => (
                <BottomSheetBackdrop
                    {...props}
                    appearsOnIndex={0}
                    disappearsOnIndex={-1}
                    pressBehavior="close"
                />
            ),
            []
        );

        const filteredAssets = assets.filter((asset) =>
            asset.filename.toLowerCase().includes(search.toLowerCase())
        );

        return (
            <BottomSheetModal
                ref={ref}
                index={0}
                snapPoints={["60%", "90%"]}
                backdropComponent={renderBackdrop}
                enablePanDownToClose
                backgroundStyle={{ backgroundColor: "#F9FAFB" }}
            >
                <BottomSheetView style={{ flex: 1 }}>
                    <View className="px-4 pt-2 pb-4 border-b border-gray-100 bg-white">
                        <View className="flex flex-row justify-between items-center mb-4">
                            <Text className="text-xl font-JakartaBold text-gray-800">
                                Select Audio
                            </Text>
                            <TouchableOpacity onPress={() => fetchAudios()}>
                                <Image source={icons.filter as any} className="w-5 h-5" tintColor="#42d6a6" />
                            </TouchableOpacity>
                        </View>

                        <View className="bg-gray-50 rounded-2xl px-4 flex flex-row items-center border border-gray-100">
                            <Image source={icons.search as any} className="w-4 h-4" tintColor="#A3A3A3" />
                            <TextInput
                                placeholder="Search audios..."
                                className="py-3 flex-1 ml-2 text-base font-Jakarta"
                                value={search}
                                onChangeText={setSearch}
                            />
                        </View>
                    </View>

                    {loading && assets.length === 0 ? (
                        <View className="flex-1 items-center justify-center">
                            <ActivityIndicator size="large" color="#42d6a6" />
                            <Text className="mt-2 text-gray-500 font-Jakarta">Loading audios...</Text>
                        </View>
                    ) : (
                        <BottomSheetFlatList
                            data={filteredAssets}
                            keyExtractor={(item) => item.id}
                            contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    className="bg-white rounded-2xl p-4 mb-3 flex flex-row items-center shadow-sm border border-gray-50"
                                    onPress={() => handleSelect(item)}
                                >
                                    <View className="w-12 h-12 bg-amber-50 rounded-xl items-center justify-center mr-4">
                                        <Image source={icons.audio as any} className="w-6 h-6" tintColor="#F59E0B" />
                                    </View>
                                    <View className="flex-1">
                                        <Text className="text-gray-800 font-JakartaSemiBold text-sm" numberOfLines={1}>
                                            {item.filename}
                                        </Text>
                                        <Text className="text-gray-400 text-xs mt-1">
                                            {Math.round(item.duration)} sec • {bytesToMB(0)}
                                        </Text>
                                    </View>
                                    <View className="w-8 h-8 rounded-full bg-gray-50 items-center justify-center">
                                        <Image source={icons.send as any} className="w-4 h-4 rotate-45" tintColor="#42d6a6" />
                                    </View>
                                </TouchableOpacity>
                            )}
                            ListEmptyComponent={() => (
                                <View className="items-center justify-center py-20">
                                    <Text className="text-gray-400 font-Jakarta">No audio files found</Text>
                                </View>
                            )}
                        />
                    )}
                </BottomSheetView>
            </BottomSheetModal>
        );
    }
);

export default AudioPickerModal;
