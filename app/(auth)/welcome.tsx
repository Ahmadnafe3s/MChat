import CustomButton from "@/components/custom-button";
import { onboarding } from "@/constants";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { Dimensions, Image, Text, View } from "react-native";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const Welcome = () => {
  const carouselRef = useRef<ICarouselInstance>(null);
  const [index, setIndex] = useState(0);

  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-white">
      {/* Skip Button */}
      <View className="w-full items-end p-5">
        <Text
          className="font-JakartaBold"
          onPress={() => router.push("/(auth)/signin")}
        >
          Skip
        </Text>
      </View>

      {/* Carousel */}
      <View className="flex-1">
        <Carousel
          ref={carouselRef}
          width={width}
          height={500}
          data={onboarding}
          loop={false}
          pagingEnabled
          onSnapToItem={(i) => setIndex(i)}
          renderItem={({ item }) => (
            <View className="flex items-center justify-center bg-white p-5">
              <Image
                source={item.image as any}
                className="w-full h-[300px]"
                resizeMode="contain"
              />
              <View className="mt-10 flex gap-5">
                <Text className="mt-5 font-bold text-3xl mx-10 text-center">
                  {item.title}
                </Text>
                <Text className="text-md font-JakartaRegular text-center text-[#858585]">
                  {item.description}
                </Text>
              </View>
            </View>
          )}
        />
      </View>

      {/* Custom Pagination Dots */}
      <View className="flex flex-row justify-center items-center mb-4">
        {Array.from({ length: onboarding.length }).map((_, i) => (
          <View
            key={i}
            className={`h-1 w-8 mx-1 rounded-full ${i === index ? "bg-black" : "bg-secondary-200"
              }`}
          />
        ))}
      </View>

      {/* Button */}
      <View className="w-full px-2.5 mb-10">
        <CustomButton
          title={index === onboarding.length - 1 ? "Get Started" : "Next"}
          onPress={() => {
            if (index === onboarding.length - 1) {
              router.replace("/(auth)/signin");
            } else {
              carouselRef.current?.next();
            }
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Welcome;
