import React, { memo } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'

interface Props {
    defaultValue?: string
    options: string[]
    className?: string
    onSelect: (value: string) => void
}

const HorizontalFilter = ({ options, defaultValue, onSelect, className }: Props) => {

    const [selected, setSelected] = React.useState<string>(defaultValue ?? "");

    const handleSelect = (option: string) => {
        setSelected(option);
        onSelect(option);
    };

    return (
        <View className={`${className}`}>
            <FlatList
                data={options}
                horizontal
                keyExtractor={(item) => item}
                keyboardShouldPersistTaps="handled"
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => handleSelect(item)}
                        className={`px-4 h-10  flex items-center justify-center rounded-full border ${selected === item ? 'bg-emerald-100 border-emerald-300' : 'bg-gray-100 border-gray-200'}`}
                    >
                        <Text className={`text-sm font-bold ${selected === item ? 'text-green-700' : 'text-gray-700'}`}>{item}</Text>
                    </TouchableOpacity>
                )}
                contentContainerStyle={{
                    gap: 10,
                }}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

export default memo(HorizontalFilter)