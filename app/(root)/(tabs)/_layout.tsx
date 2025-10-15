import { icons } from '@/constants'
import { Tabs } from 'expo-router'
import React from 'react'
import { Image, View } from 'react-native'

const TabLayout = () => {

    const TabIcon = ({ focused, Icon }: { focused: boolean, Icon: any }) => {
        return (
            <View className={`h-9 w-14 justify-center items-center rounded-full ${focused && 'bg-emerald-100'}`}>
                <Image source={Icon} className='w-6 h-6' tintColor={focused ? '#059669' : '#A3A3A3'} />
            </View>
        )
    }

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: 'black',
                tabBarInactiveTintColor: 'black',
                tabBarLabelStyle: {
                    marginTop: 2,
                    fontSize: 15
                },

                tabBarStyle: {
                    gap: 2,
                    height: 70,
                },
                tabBarItemStyle: {
                    flexDirection: "row",
                    justifyContent: 'center',
                    alignItems: 'center',
                }
            }}
        >
            <Tabs.Screen
                name="chats"
                options={{
                    tabBarLabel: 'Chats',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (<TabIcon focused={focused} Icon={icons.chat} />)
                }}
            />
            <Tabs.Screen

                name="contacts"
                options={{
                    tabBarLabel: 'Contacts',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (<TabIcon focused={focused} Icon={icons.contact} />)
                }}
            />
            <Tabs.Screen

                name="campaign"
                options={{
                    tabBarLabel: 'Campaigns',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (<TabIcon focused={focused} Icon={icons.campaign} />)
                }}
            />
            <Tabs.Screen

                name="callLogs"
                options={{
                    tabBarLabel: 'Calls',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (<TabIcon focused={focused} Icon={icons.call} />)
                }}
            />
        </Tabs>
    )
}

export default TabLayout