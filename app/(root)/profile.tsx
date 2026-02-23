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
        <View className='flex-1 bg-gray-100'>
            <StatusBar style="light" />

            <ScrollView
                className='flex-1'
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: insets.bottom + 30 }}
            >
                {/* ─── Header ─── */}
                <View
                    className='bg-emerald-600 px-5 pb-24 rounded-b-[40px]'
                    style={{ paddingTop: insets.top + 12 }}
                >
                    <View className='flex flex-row items-center justify-between'>
                        <TouchableOpacity
                            className='p-3 bg-white/20 rounded-full'
                            onPress={() => router.back()}
                        >
                            <Image source={icons.moveLeft as any} className='w-5 h-5' tintColor='#fff' />
                        </TouchableOpacity>

                        <Text className='text-xl font-JakartaBold text-white'>Profile</Text>

                        <TouchableOpacity
                            className='p-3 bg-red-500 rounded-full'
                            onPress={() => {
                                logout()
                                router.replace('/(auth)/signin')
                            }}
                        >
                            <Image source={icons.logout as any} className='w-5 h-5' tintColor='#fff' />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* ─── Profile Card ─── */}
                <View className='px-5 -mt-16'>
                    <View className='bg-white rounded-3xl p-5 shadow-sm items-center'>
                        <View className='p-1 bg-emerald-100 rounded-full -mt-14'>
                            <Image
                                source={{ uri: user?.company_logo }}
                                className='w-24 h-24'
                                style={{ borderRadius: 999, resizeMode: 'contain' }}
                            />
                        </View>
                        <Text className='text-xl font-JakartaBold text-gray-800 mt-2'>{user?.name}</Text>
                        <Text className='text-gray-400 font-Jakarta text-sm'>{user?.email}</Text>

                        {/* Role & Wallet row */}
                        <View className='flex flex-row items-center gap-3 mt-3'>
                            <View className='px-4 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full'>
                                <Text className='text-emerald-600 font-JakartaSemiBold text-xs capitalize'>{user?.role}</Text>
                            </View>
                            <View className='px-4 py-1.5 bg-amber-50 border border-amber-200 rounded-full flex flex-row items-center gap-1.5'>
                                <Text className='text-sm'>💰</Text>
                                <Text className='text-amber-700 font-JakartaBold text-xs'>₹{user?.wallet}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* ─── Quick Info Grid ─── */}
                <View className='px-5 mt-4'>
                    <View className='flex flex-row gap-3'>
                        <InfoTile label='Company' value={user?.company!} emoji='🏢' />
                        <InfoTile label='Phone' value={user?.mobile!} emoji='📱' />
                    </View>
                </View>

                {/* ─── WhatsApp Business ─── */}
                {user?.whatsapp && (
                    <View className='px-5 mt-5'>
                        <SectionHeader title='WhatsApp Business' emoji='💬' />
                        <View className='bg-white rounded-2xl shadow-sm overflow-hidden'>
                            {/* Top status strip */}
                            <View className='flex flex-row items-center justify-between px-4 py-3 bg-emerald-50 border-b border-emerald-100'>
                                <View className='flex flex-row items-center gap-2'>
                                    <View className='w-2.5 h-2.5 rounded-full bg-green-500' />
                                    <Text className='text-sm font-JakartaSemiBold text-gray-700'>{user.whatsapp.verified_name}</Text>
                                </View>
                                <View className={`px-2.5 py-1 rounded-full ${user.whatsapp.status === 'CONNECTED' ? 'bg-green-500' : 'bg-red-500'}`}>
                                    <Text className='text-[10px] font-JakartaBold text-white'>{user.whatsapp.status}</Text>
                                </View>
                            </View>

                            {/* Stats row */}
                            <View className='flex flex-row border-b border-gray-100'>
                                <StatBox
                                    label='Quality'
                                    value={user.whatsapp.quality_rating}
                                    color={user.whatsapp.quality_rating === 'GREEN' ? 'text-green-600' : user.whatsapp.quality_rating === 'YELLOW' ? 'text-yellow-600' : 'text-red-600'}
                                />
                                <View className='w-[1px] bg-gray-100' />
                                <StatBox label='Limit' value={user.whatsapp.messaging_limit} />
                                <View className='w-[1px] bg-gray-100' />
                                <StatBox label='Vertical' value={user.whatsapp.vertical} />
                            </View>

                            <DetailRow icon={icons.phone} label='Number' value={user.whatsapp.number} />
                            <DetailRow icon={icons.mail} label='Email' value={user.whatsapp.email} />
                            <DetailRow icon={icons.star} label='Plan' value={user.whatsapp.plan} />
                            <DetailRow icon={icons.user} label='About' value={user.whatsapp.about} />

                            {user.whatsapp.description ? (
                                <View className='px-4 py-3 border-t border-gray-100'>
                                    <Text className='text-[10px] text-gray-400 font-Jakarta uppercase tracking-wider mb-1'>Description</Text>
                                    <Text className='text-xs font-Jakarta text-gray-500 leading-4'>{user.whatsapp.description}</Text>
                                </View>
                            ) : null}

                            {user.whatsapp.address ? (
                                <View className='px-4 py-3 border-t border-gray-100'>
                                    <Text className='text-[10px] text-gray-400 font-Jakarta uppercase tracking-wider mb-1'>Address</Text>
                                    <Text className='text-xs font-Jakarta text-gray-500 leading-4'>{user.whatsapp.address}</Text>
                                </View>
                            ) : null}
                        </View>
                    </View>
                )}

                {/* ─── Voice / IVR ─── */}
                {user?.voice && (
                    <View className='px-5 mt-5'>
                        <SectionHeader title='Voice / IVR' emoji='📞' />
                        <View className='bg-white rounded-2xl shadow-sm overflow-hidden'>
                            <View className='flex flex-row items-center gap-2 px-4 py-3 bg-blue-50 border-b border-blue-100'>
                                <View className='w-2.5 h-2.5 rounded-full bg-blue-500' />
                                <Text className='text-sm font-JakartaSemiBold text-gray-700'>{user.voice.name}</Text>
                            </View>

                            <DetailRow icon={icons.phone} label='Number' value={user.voice.number} />
                            <DetailRow icon={icons.dialer} label='Mirror' value={user.voice.mirror_number} />
                            <DetailRow icon={icons.user} label='Destination' value={user.voice.destination_name} />
                            <DetailRow icon={icons.star} label='Plan' value={user.voice.plan} />
                        </View>
                    </View>
                )}
            </ScrollView>
        </View>
    )
}

export default Profile


/* ────────── Sub-components ────────── */

const SectionHeader = ({ title, emoji }: { title: string; emoji: string }) => (
    <View className='flex flex-row items-center gap-2 mb-3'>
        <Text className='text-base'>{emoji}</Text>
        <Text className='text-gray-500 font-JakartaSemiBold text-sm uppercase tracking-wider'>{title}</Text>
    </View>
)

const InfoTile = ({ label, value, emoji }: { label: string; value: string; emoji: string }) => (
    <View className='flex-1 bg-white rounded-2xl px-4 py-3.5 shadow-sm'>
        <View className='flex flex-row items-center gap-2 mb-1'>
            <Text className='text-sm'>{emoji}</Text>
            <Text className='text-[10px] text-gray-400 font-Jakarta uppercase tracking-wider'>{label}</Text>
        </View>
        <Text className='text-sm font-JakartaSemiBold text-gray-700' numberOfLines={1}>{value}</Text>
    </View>
)

const StatBox = ({ label, value, color }: { label: string; value: string; color?: string }) => (
    <View className='flex-1 py-3 items-center'>
        <Text className='text-[10px] text-gray-400 font-Jakarta uppercase tracking-wide'>{label}</Text>
        <Text className={`text-xs font-JakartaBold mt-0.5 ${color || 'text-gray-700'}`} numberOfLines={1}>{value}</Text>
    </View>
)

const DetailRow = ({ icon, label, value }: { icon: any; label: string; value: string }) => (
    <View className='flex flex-row items-center gap-3 px-4 py-3 border-t border-gray-50'>
        <View className='w-8 h-8 bg-gray-50 rounded-lg items-center justify-center'>
            <Image source={icon} className='w-4 h-4' tintColor='#9ca3af' />
        </View>
        <View className='flex-1'>
            <Text className='text-[10px] text-gray-400 font-Jakarta uppercase tracking-wider'>{label}</Text>
            <Text className='text-sm font-JakartaSemiBold text-gray-700 mt-0.5'>{value}</Text>
        </View>
    </View>
)