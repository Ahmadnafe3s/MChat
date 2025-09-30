import { Stack } from 'expo-router'
import React from 'react'

const RootLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="chats" options={{ headerShown: false }} />
            <Stack.Screen name="conversation" options={{ headerShown: false }} />
            <Stack.Screen name="profile" options={{ headerShown: false }} />
            <Stack.Screen name="searchChat" options={{ headerShown: false }} />
            <Stack.Screen name="quickReplies" options={{ headerShown: false }} />
            <Stack.Screen name="chatProfile" options={{ headerShown: false }} />
        </Stack>
    )
}

export default RootLayout