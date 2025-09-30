// components/Dropdown.tsx
import React, { useState } from "react";
import {
    FlatList,
    Image,
    ImageStyle,
    Modal,
    Pressable,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface DropdownProps {
    options: string[];
    icon: string;
    iconStyle?: ImageStyle;
    iconBgStyle?: string;
    onSelect: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
    options,
    icon,
    iconStyle,
    iconBgStyle,
    onSelect,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (option: string) => {
        setIsOpen(false);
        onSelect(option);
    };

    return (
        <View className="relative">
            {/* Dropdown Button */}
            <TouchableOpacity
                className={`size-12 rounded-full bg-white flex items-center justify-center shadow-sm ${iconBgStyle}`}
                onPress={() => setIsOpen(true)}
                activeOpacity={0.7}
            >
                <Image source={icon as any} style={iconStyle} />
            </TouchableOpacity>

            {/* Dropdown Modal */}
            <Modal
                transparent
                visible={isOpen}
                animationType="fade"
                statusBarTranslucent
            >
                {/* Semi-transparent backdrop */}
                <Pressable
                    className="flex-1 bg-black/20"
                    onPress={() => setIsOpen(false)}
                >
                    {/* Dropdown menu container */}
                    <View className="absolute top-16 right-6 bg-white rounded-xl elevation-2xl min-w-52 overflow-hidden">
                        <FlatList
                            data={options}
                            className="max-h-64"
                            keyExtractor={(item) => item}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    className={`px-5 py-3.5 border-b border-gray-100 active:bg-gray-50 ${options.length - 1 === index ? "border-b-0" : ""
                                        }`}
                                    onPress={() => handleSelect(item)}
                                    activeOpacity={0.6}
                                >
                                    <Text className="font-Jakarta text-base text-gray-800">
                                        {item}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </Pressable>
            </Modal>
        </View>
    );
};

export default Dropdown;