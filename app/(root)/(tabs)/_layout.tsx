import { icons } from '@/constants'
import { Tabs } from 'expo-router'
import React from 'react'
import { Image, View } from 'react-native'

const TabLayout = () => {

    const TabIcon = ({ focused, Icon }: { focused: boolean, Icon: any }) => {
        return (
            <View className={`p-3 rounded-full ${focused && 'bg-yellow-600'}`}>
                <Image source={Icon} className='w-6 h-6' />
            </View>
        )
    }

    return (
        <Tabs
            screenOptions={{
                tabBarStyle: {
                    gap: 2,
                    height : 70
                }
            }}
        >
            <Tabs.Screen
                name="chats"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (<TabIcon focused={focused} Icon={icons.audio} />)
                }}

            />
        </Tabs>
    )
}

export default TabLayout