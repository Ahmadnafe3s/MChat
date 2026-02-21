import { Ionicons } from '@expo/vector-icons'
import React, { memo, useState } from 'react'
import {
    FlatList,
    Modal,
    Pressable,
    Text,
    TouchableOpacity,
    View
} from 'react-native'

interface Props {
    defaultValue?: string
    options: string[]
    className?: string
    onSelect: (value: string) => void
}

const HorizontalFilter = ({
    options,
    defaultValue,
    onSelect,
    className
}: Props) => {

    const [selected, setSelected] = useState(defaultValue ?? "")
    const [visible, setVisible] = useState(false)

    const firstFour = options.slice(0, 4)
    const showMoreButton = options.length > 4

    const handleSelect = (option: string) => {
        setSelected(option)
        onSelect(option)
        setVisible(false)
    }

    return (
        <>
            {/* Horizontal List */}
            <View className={className}>
                <FlatList
                    data={firstFour}
                    horizontal
                    keyExtractor={(item) => item}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ gap: 10 }}
                    renderItem={({ item }) => {

                        const isSelected = selected === item

                        return (
                            <TouchableOpacity
                                onPress={() => handleSelect(item)}
                                className={`px-4 h-10 rounded-full border items-center justify-center ${isSelected
                                    ? 'bg-emerald-100 border-emerald-300'
                                    : 'bg-gray-100 border-gray-200'
                                    }`}
                            >
                                <Text className={`font-bold text-sm ${isSelected
                                    ? 'text-green-700'
                                    : 'text-gray-700'
                                    }`}>
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        )
                    }}
                    ListFooterComponent={
                        showMoreButton ? (
                            <TouchableOpacity
                                onPress={() => setVisible(true)}
                                className="w-10 h-10 rounded-full bg-emerald-500 items-center justify-center ml-1"
                            >
                                <Ionicons name="add" size={20} color="white" />
                            </TouchableOpacity>
                        ) : null
                    }
                />
            </View>

            {/* Small Modal */}
            <Modal
                visible={visible}
                transparent
                animationType="fade"
            >
                <Pressable
                    className="flex-1 bg-black/30 justify-center items-center"
                    onPress={() => setVisible(false)}
                >
                    <Pressable
                        className="bg-white rounded-2xl p-4 w-[80%] max-h-[50%]"
                        onPress={() => { }}
                    >

                        <Text className="text-lg font-bold mb-3 text-center">
                            Select Option
                        </Text>

                        <FlatList
                            data={options.slice(4)}
                            keyExtractor={(item) => item}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => {

                                const isSelected = selected === item

                                return (
                                    <TouchableOpacity
                                        onPress={() => handleSelect(item)}
                                        className={`p-3 rounded-xl mb-2 ${isSelected
                                            ? 'bg-emerald-100'
                                            : 'bg-gray-100'
                                            }`}
                                    >
                                        <Text className={`font-semibold ${isSelected
                                            ? 'text-green-700'
                                            : 'text-gray-800'
                                            }`}>
                                            {item}
                                        </Text>
                                    </TouchableOpacity>
                                )
                            }}
                        />

                    </Pressable>
                </Pressable>
            </Modal>
        </>
    )
}

export default memo(HorizontalFilter)