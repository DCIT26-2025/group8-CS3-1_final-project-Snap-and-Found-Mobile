import { View, Text, ScrollView, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { Link, router } from 'expo-router';
import images from '@/constants/images';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignIn = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignIn = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('http://192.168.1.3:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', `Welcome back, ${data.user.full_name}`);

        // Save user data in AsyncStorage
        await AsyncStorage.setItem('user', JSON.stringify(data.user));

        router.replace('/Dashboard');
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      Alert.alert('Network Error', 'Please try again later.');
    }
    setIsSubmitting(false);
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView>
        <View className="w-[90%] justify-center min-h-[95vh] px-4 my-6 self-center">
          <Image source={images.logo} resizeMode="contain" className="w-[180px] h-[180px] self-center" />
          <Text className="text-2xl text-quaternary mt-[55px] font-psemibold">
            Sign in to <Text className="text-secondary">Snap & Found</Text>
          </Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            keyboardType="email-address"
            placeholder=""
            otherStyles="mt-7"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            placeholder=""
            otherStyles="mt-3"
          />

          <CustomButton
            title={isSubmitting ? 'Signing in...' : 'Sign in'}
            handlePress={handleSignIn}
            containerStyles="mt-7"
            disabled={isSubmitting}
          />

          <View className="justify-center pt-2 flex-row gap-2">
            <Text className="text-m text-quaternary font-pregular">Don't have an account?</Text>
            <Link href="/sign-up" className="text-m text-secondary font-psemibold">
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
