import { useAuthStore } from "@/store/auth";
import { Redirect } from "expo-router";
import React from "react";

const Index = () => {
  const { user, isHydrated } = useAuthStore()

  if (!isHydrated) {
    return null; // Or a splash screen/loader
  }

  if (!user) {
    return <Redirect href={"/(auth)/welcome"} />;
  }

  // Redirect to chats
  return <Redirect href={"/(root)/(tabs)/chats"} />;

};

export default Index;
