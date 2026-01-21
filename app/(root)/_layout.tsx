import { Stack } from 'expo-router'
import React from 'react'

const RootLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="conversation" options={{ headerShown: false }} />
            <Stack.Screen name="profile" options={{ headerShown: false }} />
            <Stack.Screen name="quickReplies" options={{ headerShown: false }} />
            <Stack.Screen name="chatProfile" options={{ headerShown: false }} />
            <Stack.Screen name="allMedia" options={{ headerShown: false }} />
        </Stack>
    )
}

export default RootLayout