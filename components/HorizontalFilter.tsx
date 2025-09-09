import React, { useEffect } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'

interface Props {
    defaultValue?: string
    options: string[]
    onSelect: (value: string) => void
}

const HorizontalFilter = ({ options, defaultValue, onSelect }: Props) => {

    const [selected, setSelected] = React.useState<string>('');

    const handleSelect = (option: string) => {
        setSelected(option);
        onSelect(option);
    };

    useEffect(() => {
        setSelected(defaultValue as string)
    }, [defaultValue])

    return (
        <View>
            <FlatList
                data={options}
                horizontal
                keyExtractor={(item) => item}
                keyboardShouldPersistTaps="handled"
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => handleSelect(item)}
                        className={`px-4 h-10  flex items-center justify-center rounded-full ${selected === item ? 'bg-green-100' : 'bg-gray-200'}`}
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

export default HorizontalFilter