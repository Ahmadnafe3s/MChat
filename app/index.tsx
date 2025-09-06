import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  return (
    <SafeAreaView>
      <View className="flex min-h-screen items-center justify-center">
        <Text className="text-3xl text-black font-semibold">MuzzTech Chat</Text>
      </View>
    </SafeAreaView>
  );
};

export default Index;
