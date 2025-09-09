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
            {/* Dropdown Button (always visible) */}
            <TouchableOpacity
                className={`size-12 rounded-full bg-white flex items-center justify-center ${iconBgStyle}`}
                onPress={() => setIsOpen(true)}
            >
                <Image source={icon as any} style={iconStyle} />
            </TouchableOpacity>

            {/* Dropdown Modal */}
            <Modal
                transparent
                visible={isOpen}
                animationType="fade"
            >
                {/* Fullscreen overlay (outside press closes dropdown) */}
                <Pressable
                    className="flex-1"
                    onPress={() => setIsOpen(false)}
                    style={{ backgroundColor: "transparent" }}
                >
                    {/* Keep dropdown aligned near button */}
                    <View className="absolute top-16 right-6 bg-white rounded-lg shadow-md min-w-52">
                        <FlatList
                            data={options}
                            className="h-[300px]"
                            keyExtractor={(item) => item}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    className={`px-4 py-2 border-b border-gray-200 ${options.length - 1 === index ? "border-b-0" : ""
                                        }`}
                                    onPress={() => handleSelect(item)}
                                >
                                    <Text className="font-Jakarta text-lg">{item}</Text>
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
