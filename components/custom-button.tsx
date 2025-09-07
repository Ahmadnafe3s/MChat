import React from "react";
import {
    ActivityIndicator,
    Pressable,
    PressableProps,
    Text,
    View,
} from "react-native";

interface CustomButtonProps extends Omit<PressableProps, "children"> {
  title?: string;
  variant?: "primary" | "secondary" | "success" | "danger" | "outlined" | "ghost";
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
}

const CustomButton = ({
  title,
  variant = "primary",
  onPress,
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  className = "",
  ...props
}: CustomButtonProps) => {
  // Variant styles
  const variants = {
    primary: "bg-green-500 active:bg-green-600",
    secondary: "bg-gray-500 active:bg-gray-600",
    success: "bg-green-500 active:bg-green-600",
    danger: "bg-red-500 active:bg-red-600",
    outlined: "bg-transparent border border-gray-200 active:bg-gray-100",
    ghost : 'bg-transparent hover:bg-yellow-50 active:bg-gray-100',
  };

  // Text colors
  const textColors = {
    primary: "text-white",
    secondary: "text-white",
    success: "text-white",
    danger: "text-white",
    outlined: "text-gray-800",
    ghost : "text-gray-800",
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      className={`
      w-full flex-row items-center justify-center
        px-6 py-4 rounded-full
        ${variants[variant]}
        ${disabled || loading ? "opacity-50" : ""}
        ${className}
      `}
      {...props}
    >
      {leftIcon && !loading && (
        <View className={title ? "mr-2" : ""}>{leftIcon}</View>
      )}

      {loading && (
        <ActivityIndicator
          size="small"
          color={variant === "outlined" ? "#3B82F6" : "#FFFFFF"}
          className={title ? "mr-2" : ""}
        />
      )}

      {title && (
        <Text className={`${textColors[variant]} font-semibold text-base`}>
          {title}
        </Text>
      )}

      {rightIcon && !loading && (
        <View className={title ? "ml-2" : ""}>{rightIcon}</View>
      )}
    </Pressable>
  );
};

export default CustomButton;

// Simple usage examples:
/*
import Icon from 'react-native-vector-icons/Ionicons';

// Basic button
<CustomButton
  title="Click Me"
  onPress={() => console.log('Pressed')}
/>

// With left icon
<CustomButton
  title="Login"
  variant="primary"
  leftIcon={<Icon name="log-in" size={20} color="white" />}
  onPress={() => console.log('Login')}
/>

// Outlined with right icon
<CustomButton
  title="Next"
  variant="outlined"
  rightIcon={<Icon name="arrow-forward" size={20} color="#3B82F6" />}
  onPress={() => console.log('Next')}
/>

// Loading state
<CustomButton
  title="Loading..."
  loading={true}
  onPress={() => console.log('Loading')}
/>

// Custom styling
<CustomButton
  title="Custom"
  variant="success"
  className="w-full mx-4"
  onPress={() => console.log('Custom')}
/>
*/
