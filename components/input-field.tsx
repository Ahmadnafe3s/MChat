import React, { forwardRef, useState } from "react";
import { Image, Text, TextInput, View } from "react-native";

type InputFieldProps = {
  labelStyle?: string;
  label: string;
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

    return (
      <View className="my-2 w-full">
        <Text
          className={`text-lg mb-2 !text-black font-JakartaRegular ${labelStyle}`}
        >
          {label}
        </Text>
        <View
          className={`
              relative flex flex-row px-4 items-center border gap-2 bg-neutral-50 rounded-full
              ${isFocused ? "border-gray-800" : "border-neutral-200"}
              ${containerStyle}
            `}
        >
          {Icon && (
            <Image
              source={Icon}
              className="w-6 h-6"
              style={{ tintColor: "gray" }}
            />
          )}
          <TextInput
            ref={ref}
            className={`flex-1 py-4 font-JakartaSemiBold text-[15px] text-black text-left ${inputStyle}`}
            secureTextEntry={secureTextEntry}
            placeholderTextColor={"#9CA3AF"}
            placeholder={placeholder}
            onFocus={() => {
              setIsFocused(true);
              onFocus?.(); // notify parent
            }}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
        </View>
      </View>
    );
  }
);

export default InputField;
