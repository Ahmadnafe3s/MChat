import CustomButton from '@/components/custom-button'
import { icons } from '@/constants'
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'expo-router'
import React from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Profile = () => {
    const router = useRouter()
    const { user, logout } = useAuthStore();

    return (
        <SafeAreaView className='flex-1 bg-white p-5'>
            {/* Header */}
            <View className='flex flex-row gap-4 items-center'>
                <TouchableOpacity className='p-3 bg-gray-200 rounded-full' onPress={() => router.back()}>
                    <Image source={icons.moveLeft as any} className='w-5 h-5' />
                </TouchableOpacity>
                <Text className='text-2xl font-JakartaSemiBold text-gray-800'>My Profile</Text>
            </View>
            {/* Bio Data */}
            <ScrollView className='flex-1 h-full'>
                <View className='flex gap-5'>
                    <View className='flex items-center mt-10'>
                        <Image source={icons.avatar as any} className='w-40 h-40 mb-4' />
                        <Text className='text-2xl font-JakartaBold text-gray-600'>{user?.name}</Text>
                        <Text className='px-4 py-1 bg-rose-50 border border-rose-200 text-rose-500 rounded-full mt-1'>{user?.role}</Text>
                    </View>

                    <DetailFeild label='Company' value={user?.company!} icon={icons.company} />
                    <DetailFeild label='Mail' value={user?.email!} icon={icons.mail} />
                    <DetailFeild label='Phone' value={user?.mobile!} icon={icons.phone} />

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
        </SafeAreaView>
    )
}

export default Profile




const DetailFeild = ({ label, value, icon }: { label: string, value: string, icon: any }) => {
    return (
        <View className='flex gap-2'>
            <View className='flex flex-row items-center gap-2 ml-2'>
                <Image source={icon} className='w-6 h-6' tintColor={'#A3A3A3'} />
                <Text className='text-lg text-neutral-400 font-Jakarta'>{label}</Text>
            </View>
            <View className='p-4 border border-gray-200 rounded-2xl'>
                <Text className='text-lg font-JakartaSemiBold text-gray-500'>{value}</Text>
            </View>
        </View>
    )
}