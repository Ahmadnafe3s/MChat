import { useAuthStore } from "@/store/auth";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Welcome from "./(auth)/welcome";

const Index = () => {
  const isAuth = true;
  const { user } = useAuthStore()

  console.log(user)

  if (isAuth) {
    return <Welcome />;
  }

  return (
    <SafeAreaView>
      <View className="flex min-h-screen items-center justify-center">
        <Text className="text-3xl text-black font-semibold">MuzzTech Chat</Text>
      </View>
    </SafeAreaView>
  );
};

export default Index;
