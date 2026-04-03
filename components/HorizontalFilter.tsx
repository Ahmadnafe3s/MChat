import React, { memo, useState } from 'react'
import {
    FlatList,
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

    const handleSelect = (option: string) => {
        setSelected(option)
        onSelect(option)
    }

    return (
        <>
            {/* Horizontal List */}
            <View className={className}>
                <FlatList
                    data={options}
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
                />
            </View>
        </>
    )
}

export default memo(HorizontalFilter)