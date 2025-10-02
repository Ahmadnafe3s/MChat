import { icons } from "@/constants";
import { FlashList } from "@shopify/flash-list";
import React, { useState } from "react";
import { Image, Modal, Text, TouchableOpacity, View } from "react-native";

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  label?: string;
  triggerClassName?: string;
  modalTitle?: string;
}

const Select: React.FC<SelectProps> = ({
  value,
  onValueChange,
  options,
  placeholder = "Select an option",
  label,
  triggerClassName = "",
  modalTitle = "Select an option",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((opt) => opt.value === value);

  const renderItem = ({ item }: { item: SelectOption }) => {
    const isSelected = value === item.value;

    return (
      <TouchableOpacity
        onPress={() => {
          onValueChange(item.value);
          setIsOpen(false);
        }}
        className={`flex-row items-center justify-between px-5 py-4 ${isSelected ? "bg-emerald-50" : "bg-white"
          }`}
      >
        <View className="flex-row items-center gap-3 flex-1">
          <View className="size-10 rounded-full bg-gray-100 flex items-center justify-center">
            <Text className="font-JakartaBold text-base text-gray-600">
              {item.label.charAt(0).toUpperCase()}
            </Text>
          </View>
          <Text
            className={`font-JakartaSemiBold text-base flex-1 ${isSelected ? "text-emerald-600" : "text-gray-800"
              }`}
          >
            {item.label}
          </Text>
        </View>
        {isSelected && (
          <View className="bg-emerald-500 rounded-full size-6 flex items-center justify-center">
            <Text className="text-white text-lg font-bold">✓</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View>
      {label && (
        <Text className="text-sm font-JakartaSemiBold text-gray-700 mb-3 px-1">
          {label}
        </Text>
      )}

      <TouchableOpacity
        onPress={() => setIsOpen(true)}
        className={`bg-white rounded-xl   border border-gray-200 p-4 flex-row items-center justify-between ${triggerClassName}`}
      >
        {selectedOption ? (
          <View className="flex-row items-center gap-3 flex-1">
            <View className="size-8 rounded-full bg-gray-100 flex items-center justify-center">
              <Text className="font-JakartaSemiBold text-sm text-gray-600">
                {selectedOption.label.charAt(0).toUpperCase()}
              </Text>
            </View>
            <Text className="font-JakartaMedium text-base text-gray-700 flex-1">
              {selectedOption.label}
            </Text>
          </View>
        ) : (
          <Text className="font-Jakarta text-base text-gray-400">
            {placeholder}
          </Text>
        )}
        <Image
          source={icons.chevronDown as any}
          className="w-5 h-5 tint-gray-400"
        />
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setIsOpen(false)}
        statusBarTranslucent={true}
      >
        <View className="flex-1 bg-black/40 justify-end">
          <TouchableOpacity
            className="flex-1"
            activeOpacity={1}
            onPress={() => setIsOpen(false)}
          />
          <View className="bg-white rounded-t-3xl">
            <View className="flex-row items-center justify-between px-5 py-4 border-b border-gray-200">
              <Text className="text-lg font-JakartaBold text-gray-800">
                {modalTitle}
              </Text>
              <TouchableOpacity
                onPress={() => setIsOpen(false)}
                className="bg-gray-100 rounded-full p-2"
              >
                <Image source={icons.cross as any} className="w-5 h-5" />
              </TouchableOpacity>
            </View>

            <View style={{ height: Math.min(options.length * 68, 400) }}>
              <FlashList
                data={options}
                keyExtractor={(item) => item.value}
                estimatedItemSize={68}
                renderItem={renderItem}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Select;