import { useAuthStore } from '@/store/auth'
import React from 'react'
import { Text, View } from 'react-native'

const Test = () => {

    const { user } = useAuthStore()

    return (
        <View className='pt-20'>
            <Text className='mb-5'>Hey I am app see credential</Text>

          <View className='bg-amber-500'>
                <Text>{user?.id}</Text>
                <Text>{user?.name}</Text>
                <Text>{user?.email}</Text>
                <Text>{user?.image}</Text>
          </View>
        </View>
    )
}

export default Test