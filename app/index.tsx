import { Image, ScrollView, Text, View } from "react-native";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context';

import images from "@/constants/images";
import CustomButton from "@/components/CustomButton";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView contentContainerStyle={{height: '100%'}}>
        <View className="w-full justify-center items-center min-h-[100vh] px-4">
          <Image
            source={images.logo}
            className="h-[200px]"
            resizeMode="contain"
          />

          <Image
            source={images.title}
            className="w-[80%] mt-[-20px]"
            resizeMode="contain"
          />

          <View className='relative mt-[-30px] mb-5'>
            <Text className='text-lg text-quaternary font-psemibold text-center mb-20'>
              Find your stuff in a snap.
            </Text>
          </View>

          <CustomButton 
            title='Get Started'
            handlePress={() => router.replace('/sign-in')}
            containerStyles='w-[90%] absolute self-center bottom-[50px]'
          />

        </View>
      </ScrollView>
      <StatusBar backgroundColor='#faf8f6' style='dark'/>
    </SafeAreaView>
  );
}
