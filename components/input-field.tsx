import { Ionicons } from "@expo/vector-icons";
import React, { forwardRef, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

type InputFieldProps = {
  labelStyle?: string;
  label?: string;
  error?: string;
  Icon?: any;
  secureTextEntry?: boolean;
  placeholder?: string;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: { size?: number; color?: string };
  className?: string;
  onFocus?: () => void; // 👈 allow parent to get notified
} & React.ComponentProps<typeof TextInput>;

const InputField = forwardRef<TextInput, InputFieldProps>(
  (
    {
      labelStyle,
      label,
      error,
      Icon,
      secureTextEntry = false,
      placeholder,
      containerStyle,
      inputStyle,
      iconStyle,
      className,
      onFocus,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };

    return (
      <View className="my-2 w-full">
        {label && (
          <Text
            className={`text-lg mb-2 !text-black font-JakartaRegular ${labelStyle}`}
          >
            {label}
          </Text>
        )}
        <View
          className={`
              relative flex flex-row px-4 items-center border gap-2 bg-neutral-50 rounded-full
              ${isFocused ? "border-green-600" : "border-neutral-200"}
              ${containerStyle}
            `}
        >
          {Icon && (
            <Image
              source={Icon}
              className="w-6 h-6"
              style={{ tintColor: isFocused ? "#16a34a" : "#9CA3AF" }}
            />
          )}
          <TextInput
            ref={ref}
            className={`flex-1 py-4 font-JakartaSemiBold text-[15px] text-black text-left ${inputStyle}`}
            secureTextEntry={secureTextEntry && !isPasswordVisible}
            placeholderTextColor={"#9CA3AF"}
            placeholder={placeholder}
            onFocus={() => {
              setIsFocused(true);
              onFocus?.(); // notify parent
            }}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
          {secureTextEntry && (
            <TouchableOpacity
              onPress={togglePasswordVisibility}
              className="p-2"
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons
                name={isPasswordVisible ? "eye-off" : "eye"}
                size={22}
                color={isFocused ? "#16a34a" : "#9CA3AF"}
              />
            </TouchableOpacity>
          )}
        </View>
        {error && (
          <Text className="text-red-500 text-sm mt-0.5 ml-2">{error}</Text>
        )}
      </View>
    );
  }
);


InputField.displayName = "InputField";

export default InputField;
