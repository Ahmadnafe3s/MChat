import { useAuthStore } from "@/store/auth";
import { Redirect } from "expo-router";
import React from "react";

const Index = () => {
  const { user } = useAuthStore()

  if (!user) {
    return <Redirect href={"/(auth)/welcome"} />;
  }
  return <Redirect href={"/(root)/chats"} />;

};

export default Index;
