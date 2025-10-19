import Multimedia from '@/components/Multimedia'
import { icons } from '@/constants'
import useChat from '@/hooks/useChat'
import { useToastStore } from '@/store/toast'
import downloadFile from '@/utils/downloadFiles'
import { FlashList } from '@shopify/flash-list'
import { useRouter } from 'expo-router'
import React, { useMemo, useRef, useState } from 'react'
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Video, { VideoRef } from 'react-native-video'

const { width } = Dimensions.get('window')
const ITEM_SIZE = (width - 32) / 3

interface MediaItem {
  id: number
  filetype: 'image' | 'video' | 'audio' | 'application'
  format: string
  link: string
}

const AllMedia = () => {
  const router = useRouter()
  const { getChatMedia } = useChat()
  const { showToast } = useToastStore()
  const [selectedMedia, setSelectedMedia] = useState<{
    visible: boolean
    type: 'image' | 'video'
    source: string
  }>({
    visible: false,
    type: 'image',
    source: ''
  })

  const [playingAudioId, setPlayingAudioId] = useState<number | null>(null)
  const [isPaused, setIsPaused] = useState(true)
  const audioRef = useRef<VideoRef>(null)

  // Find the currently playing audio item
  const currentAudioItem = useMemo(() => {
    if (!playingAudioId || !getChatMedia.data?.data) return null
    return getChatMedia.data.data.find(item => item.id === playingAudioId)
  }, [playingAudioId, getChatMedia.data?.data])

  const handleMediaPress = (item: MediaItem) => {
    if (item.filetype === 'image' || item.filetype === 'video') {
      setSelectedMedia({
        visible: true,
        type: item.filetype,
        source: item.link
      })
    } else if (item.filetype === 'audio') {
      if (playingAudioId === item.id) {
        // Toggle pause/play for the same audio
        setIsPaused(!isPaused)
      } else {
        // Switch to a new audio
        setPlayingAudioId(item.id)
        setIsPaused(false)
      }
    } else if (item.filetype === 'application') {
      downloadFile({
        url: item.link,
        fileName: `Document-${Date.now()}.${item.format}`
      }).catch((error) => showToast("Failed to download file", "error"))
    }
  }

  const closeMediaViewer = () => {
    setSelectedMedia({ visible: false, type: 'image', source: '' })
  }

  const renderItem = ({ item }: { item: MediaItem }) => {
    const isAudio = item.filetype === 'audio'
    const isVideo = item.filetype === 'video'
    const isImage = item.filetype === 'image'
    const isApplication = item.filetype === 'application'
    const isPlaying = playingAudioId === item.id && !isPaused

    return (
      <TouchableOpacity
        onPress={() => handleMediaPress(item)}
        className="p-1"
        style={{ width: ITEM_SIZE, height: ITEM_SIZE }}
        activeOpacity={0.7}
      >
        <View className="flex-1 rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200">
          {/* Image Thumbnail */}
          {isImage && (
            <Image
              source={{ uri: item.link }}
              className="w-full h-full"
              resizeMode="cover"
            />
          )}

          {/* Video Thumbnail */}
          {isVideo && (
            <>
              <Image
                source={{ uri: item.link }}
                className="w-full h-full"
                resizeMode="cover"
              />
              <View className="absolute inset-0 items-center justify-center">
                <View className="bg-black/50 rounded-full p-3 backdrop-blur-sm">
                  <Image
                    source={icons.play as any}
                    className="w-7 h-7"
                    style={{ tintColor: '#ffffff' }}
                  />
                </View>
              </View>
            </>
          )}

          {/* Audio Visual */}
          {isAudio && (
            <>
              <View
                className="flex-1 items-center justify-center"
                style={{
                  backgroundColor: isPlaying ? '#3b82f6' : '#e5e5e5'
                }}
              >
                <View
                  className="rounded-full p-4"
                  style={{
                    backgroundColor: isPlaying ? '#ffffff' : '#3b82f6',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                    elevation: 4
                  }}
                >
                  <Image
                    source={isPlaying ? icons.pause : icons.audio as any}
                    className="w-6 h-6"
                    style={{ tintColor: isPlaying ? '#3b82f6' : '#ffffff' }}
                  />
                </View>

                {/* Audio Wave Animation - Only show when playing */}
                {isPlaying && (
                  <View className="mt-3 flex-row gap-1 items-end">
                    <View className="w-1 h-2 bg-white rounded-full" />
                    <View className="w-1 h-4 bg-white rounded-full" />
                    <View className="w-1 h-3 bg-white rounded-full" />
                    <View className="w-1 h-5 bg-white rounded-full" />
                    <View className="w-1 h-2 bg-white rounded-full" />
                  </View>
                )}
              </View>

              {/* Format Badge */}
              <View className={`absolute top-2 right-2 ${isPlaying ? 'bg-white/20' : 'bg-black/60'} px-2 py-0.5 rounded-full backdrop-blur-sm`}>
                <Text className="text-white text-[10px] font-JakartaBold uppercase">
                  {item.format}
                </Text>
              </View>
            </>
          )}

          {/* Application/Document Visual */}
          {isApplication && (
            <>
              <View className="flex-1 items-center justify-center bg-red-50">
                <View
                  className="rounded-2xl p-3 bg-white"
                  style={{
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                    elevation: 4
                  }}
                >
                  <Image
                    source={icons.clip as any}
                    className="w-8 h-8"
                    style={{ tintColor: '#dc2626' }}
                  />
                </View>

                {/* Document Type Label */}
                <View className="mt-2 bg-white/90 px-2 py-1 rounded-full">
                  <Text className="text-red-600 text-[9px] font-JakartaBold uppercase">
                    Document
                  </Text>
                </View>
              </View>

              {/* Format Badge */}
              <View className="absolute top-2 right-2 bg-red-600 px-2 py-0.5 rounded-full">
                <Text className="text-white text-[10px] font-JakartaBold uppercase">
                  {item.format}
                </Text>
              </View>

              {/* Download Icon Overlay */}
              <View className="absolute bottom-2 right-2 bg-white rounded-full p-1.5">
                <Image
                  source={icons.download as any}
                  className="w-3 h-3"
                  style={{ tintColor: '#dc2626' }}
                />
              </View>
            </>
          )}

          {/* Format Badge for non-audio/non-application */}
          {!isAudio && !isApplication && (
            <View className="absolute top-2 right-2 bg-black/60 px-2 py-0.5 rounded-full backdrop-blur-sm">
              <Text className="text-white text-[10px] font-JakartaBold uppercase">
                {item.format}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex flex-row px-5 py-4 border-b border-neutral-200 items-center justify-between">
        <View className="flex flex-row gap-3 items-center">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 items-center justify-center rounded-full bg-neutral-100 active:bg-neutral-200"
          >
            <Image source={icons.moveLeft as any} className="w-5 h-5" />
          </TouchableOpacity>
          <View>
            <Text className="text-2xl text-neutral-800 font-JakartaBold">
              Media
            </Text>
            <Text className="text-xs text-neutral-500 font-JakartaMedium">
              Photos, videos & audio
            </Text>
          </View>
        </View>
        <View className="px-3 py-1.5 bg-blue-50 rounded-full">
          <Text className="text-blue-600 font-JakartaBold text-sm">
            {getChatMedia.data?.count || 0}
          </Text>
        </View>
      </View>

      {/* Media Grid */}
      {getChatMedia.data?.data && getChatMedia.data.data.length > 0 ? (
        <FlashList
          data={getChatMedia.data.data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          numColumns={3}
          estimatedItemSize={ITEM_SIZE}
          contentContainerStyle={{ padding: 8 }}
          showsVerticalScrollIndicator={false}
          extraData={[playingAudioId, isPaused]}
        />
      ) : (
        <View className="flex-1 items-center justify-center p-8">
          <View className="w-24 h-24 bg-neutral-100 rounded-full items-center justify-center mb-4">
            <Image
              source={icons.clip as any}
              className="w-12 h-12"
              style={{ tintColor: '#9ca3af' }}
            />
          </View>
          <Text className="text-neutral-800 font-JakartaBold text-lg mb-1">
            No media yet
          </Text>
          <Text className="text-neutral-400 font-JakartaMedium text-sm text-center">
            Photos, videos and audio will appear here
          </Text>
        </View>
      )}

      {/* Global Audio Player - Hidden but controls audio playback */}
      {playingAudioId !== null && currentAudioItem && (
        <Video
          ref={audioRef}
          source={{ uri: currentAudioItem.link }}
          paused={isPaused}
          onEnd={() => {
            setIsPaused(true)
            audioRef.current?.seek(0)
          }}
          onError={(error) => {
            console.log('Audio error:', error)
            setPlayingAudioId(null)
            setIsPaused(true)
            showToast("Failed to play audio", "error")
          }}
          playInBackground={false}
          playWhenInactive={false}
          ignoreSilentSwitch="ignore"
          volume={1.0}
          style={{ width: 0, height: 0, position: 'absolute' }}
        />
      )}

      {/* Media Viewer Modal */}
      <Multimedia
        visible={selectedMedia.visible}
        type={selectedMedia.type}
        source={selectedMedia.source}
        onClose={closeMediaViewer}
      />
    </SafeAreaView>
  )
}

export default AllMedia