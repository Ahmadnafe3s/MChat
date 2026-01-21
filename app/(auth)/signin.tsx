import CustomButton from "@/components/custom-button";
import InputField from "@/components/input-field";
import { icons, images } from "@/constants";
import authApi from "@/services/auth";
import { useAuthStore } from "@/store/auth";
import { useToastStore } from "@/store/toast";
import { signinSchema } from "@/utils/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Image,
  Text,
  View
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { z } from "zod";


const SignIn = () => {
  const { setUser } = useAuthStore();
  const { showToast } = useToastStore()
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { handleSubmit, control, formState: { errors } } = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: { email: "", password: "" }
  })

  // Login
  const { mutate, isPending } = useMutation({
    mutationFn: (data: z.infer<typeof signinSchema>) => authApi(data.email, data.password),
    onSuccess: (data) => {
      setUser({
        id: data.id,
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
      showToast(err.response?.data.message!, "error")
    },
  });



  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar style="light" />
      <KeyboardAwareScrollView
        bottomOffset={120}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section with Green Background */}
        <View
          className="bg-green-700 pb-16 rounded-b-[40px]"
          style={{ paddingTop: insets.top + 16 }}
        >
          <View className="flex items-center justify-center">
            {/* Logo Container with White Background */}
            <View className="bg-white p-4 rounded-3xl shadow-lg">
              <Image source={images.logo as any} className="size-28" />
            </View>
            <Text className="text-4xl text-center text-white font-JakartaBold mt-4 tracking-wide">
              <Text className="text-emerald-200">M</Text>
              Chat
            </Text>
            <Text className="text-emerald-200 text-base font-JakartaRegular mt-1">
              Connect • Communicate • Collaborate
            </Text>
          </View>
        </View>

        {/* Welcome Text */}
        <View className="px-6 mt-8 mb-2">
          <Text className="text-gray-800 text-2xl font-JakartaBold">
            Welcome Back! 👋
          </Text>
          <Text className="text-gray-500 text-base font-JakartaRegular mt-1">
            Sign in to continue to your account
          </Text>
        </View>

        {/* Form Section */}
        <View className="px-6 pt-4">
          {/* Email Input */}
          <Controller control={control} name="email" render={({ field }) => (
            <InputField
              label="Email Address"
              Icon={icons.mail}
              iconStyle={{ color: "#9CA3AF" }}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={(text) => field.onChange(text)}
              error={errors.email && errors.email.message}
              value={field.value}
            />
          )} />

          {/* Password Input */}
          <Controller control={control} name="password" render={({ field }) => (
            <InputField
              label="Password"
              Icon={icons.key}
              iconStyle={{ color: "#9CA3AF" }}
              placeholder="Enter your password"
              secureTextEntry={true}
              onChangeText={(text) => field.onChange(text)}
              error={errors.password && errors.password.message}
              value={field.value}
            />
          )} />


          {/* Sign In Button */}
          <CustomButton
            title="Sign In"
            className="mt-2 shadow-lg"
            loading={isPending}
            onPress={handleSubmit((data) => mutate(data))}
          />

          {/* Bottom Spacing */}
          <View style={{ height: insets.bottom + 20 }} />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default SignIn;

