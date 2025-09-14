import CustomButton from "@/components/custom-button";
import InputField from "@/components/input-field";
import { icons, images } from "@/constants";
import authApi from "@/services/auth";
import { useAuthStore } from "@/store/auth";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignIn = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { setUser } = useAuthStore();
  const router = useRouter();

  // Login
  const { mutate, isPending } = useMutation({
    mutationFn: () => authApi(form.email, form.password),
    onSuccess: (data) => {
      setUser({
        id: 19, // TODO: replace with real user id
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        company: data.company,
        self_id: data.self_id,
        attribute: data.attribute,
        role: data.role,
      });
      router.push("/(root)/chats");
    },
    onError: (err: AxiosError<{ message: string }>) => {
      console.log(err);
      Alert.alert("Error", err.response?.data.message);
    },
  });

  const onSignInPress = useCallback(async () => {
    if (!Validation(form)) return;
    mutate();
  }, [form, mutate]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header Text */}
          <View className="flex items-center mt-24 justify-center gap-5">
            <View>
              <Image source={images.logo as any} className="size-36" />
              <Text className="text-3xl text-center text-gray-500 font-JakartaSemiBold">
                <Text className="text-green-800">M</Text>
                Chat
              </Text>
            </View>
            <Text className="text-green-800 text-center text-2xl font-JakartaSemiBold">
              Sign in to your account
            </Text>
          </View>

          <View className="p-5">
            <InputField
              label="Email"
              Icon={icons.mail}
              iconStyle={{ color: "#9CA3AF" }}
              placeholder="eg. john@gmaildsdfdf.com"
              onChangeText={(text) => setForm({ ...form, email: text })}
            />
            <InputField
              label="Password"
              Icon={icons.key}
              iconStyle={{ color: "#9CA3AF" }}
              placeholder="********"
              secureTextEntry={true}
              onChangeText={(text) => setForm({ ...form, password: text })}
            />

            {/* Sign Up Button */}
            <CustomButton
              title="Sign In"
              className="mt-5"
              loading={isPending}
              onPress={onSignInPress}
            />

            <Text className="text-gray-500 font-Jakarta text-center mt-5">
              Don&apos;t have an account?{" "}
              <Text
                className="text-green-800"
                onPress={() => Alert.alert("This is demo")}
              >
                Please contact admin
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;

const Validation = (form: { email: string; password: string }) => {
  if (!form.email) {
    Alert.alert("Missing Field", "Please enter your email");
    return false;
  }
  if (form.email && !form.email.includes("@")) {
    Alert.alert("Invalid Email", "Please enter a valid email address");
    return false;
  }
  if (!form.password) {
    Alert.alert("Missing Field", "Please enter your password");
    return false;
  }
  return true;
};
