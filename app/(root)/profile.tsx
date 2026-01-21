import CustomButton from '@/components/custom-button'
import { icons } from '@/constants'
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Profile = () => {
    const router = useRouter()
    const { user, logout } = useAuthStore();
    const insets = useSafeAreaInsets();

    return (
        <View className='flex-1 bg-gray-50'>
            <StatusBar style="light" />

            {/* Header Section */}
            <View
                className='bg-green-700 px-5 pb-20 rounded-b-[40px]'
                style={{ paddingTop: insets.top + 12 }}
            >
                <View className='flex flex-row gap-4 items-center'>
                    <TouchableOpacity
                        className='p-3 bg-white/20 rounded-full'
                        onPress={() => router.back()}
                    >
                        <Image source={icons.moveLeft as any} className='w-5 h-5' tintColor={'#fff'} />
                    </TouchableOpacity>
                    <Text className='text-2xl font-JakartaBold text-white'>My Profile</Text>
                </View>
            </View>

            {/* Profile Card - Overlapping Header */}
            <View className='px-5 -mt-14'>
                <View className='bg-white rounded-3xl p-6 shadow-sm'>
                    {/* Avatar Section */}
                    <View className='flex items-center -mt-16'>
                        <View className='p-1.5 bg-green-100 rounded-full'>
                            <Image source={icons.avatar as any} className='w-28 h-28' />
                        </View>
                        <Text className='text-2xl font-JakartaBold text-gray-800 mt-3'>{user?.name}</Text>
                        <View className='px-4 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full mt-2'>
                            <Text className='text-emerald-600 font-JakartaSemiBold text-sm'>{user?.role}</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Details Section */}
            <ScrollView
                className='flex-1 px-5 mt-5'
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
            >
                <Text className='text-gray-400 font-JakartaSemiBold text-sm uppercase tracking-wider mb-3'>
                    Account Details
                </Text>

                <View className='bg-white rounded-2xl overflow-hidden shadow-sm'>
                    <DetailField
                        label='Company'
                        value={user?.company!}
                        icon={icons.company}
                        isFirst
                    />
                    <DetailField
                        label='Email'
                        value={user?.email!}
                        icon={icons.mail}
                    />
                    <DetailField
                        label='Phone'
                        value={user?.mobile!}
                        icon={icons.phone}
                        isLast
                    />
                </View>

                <View className='mt-6'>
                    <CustomButton
                        variant='danger'
                        title='Logout'
                        onPress={() => {
                            logout()
                            router.replace('/(auth)/signin')
                        }}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

export default Profile


type DetailFieldProps = {
    label: string
    value: string
    icon: any
    isFirst?: boolean
    isLast?: boolean
}

const DetailField = ({ label, value, icon, isFirst, isLast }: DetailFieldProps) => {
    return (
        <View className={`flex flex-row items-center gap-4 p-4 ${!isLast ? 'border-b border-gray-100' : ''}`}>
            <View className='w-11 h-11 bg-green-50 rounded-xl items-center justify-center'>
                <Image source={icon} className='w-5 h-5' tintColor={'#16a34a'} />
            </View>
            <View className='flex-1'>
                <Text className='text-xs text-gray-400 font-Jakarta uppercase tracking-wide'>{label}</Text>
                <Text className='text-base font-JakartaSemiBold text-gray-700 mt-0.5'>{value}</Text>
            </View>
        </View>
    )
}