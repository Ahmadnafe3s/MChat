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
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Image,
  Text,
  View
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";


const SignIn = () => {
  const { setUser } = useAuthStore();
  const { showToast } = useToastStore()
  const router = useRouter();
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
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAwareScrollView
        bottomOffset={120}
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
          <Controller control={control} name="email" render={({ field }) => (
            <InputField
              label="Email"
              Icon={icons.mail}
              iconStyle={{ color: "#9CA3AF" }}
              placeholder="eg. john@gmaildsdfdf.com"
              onChangeText={(text) => field.onChange(text)}
              error={errors.email && errors.email.message}
              value={field.value}
            />
          )} />
          <Controller control={control} name="password" render={({ field }) => (
            <InputField
              label="Password"
              Icon={icons.key}
              iconStyle={{ color: "#9CA3AF" }}
              placeholder="********"
              secureTextEntry={true}
              onChangeText={(text) => field.onChange(text)}
              error={errors.password && errors.password.message}
              value={field.value}
            />
          )} />

          {/* Sign Up Button */}
          <CustomButton
            title="Sign In"
            className="mt-5"
            loading={isPending}
            onPress={handleSubmit((data) => mutate(data))}
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
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

