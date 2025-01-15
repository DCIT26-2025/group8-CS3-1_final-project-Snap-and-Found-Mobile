import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { Link, router } from 'expo-router'
import images from '@/constants/images'

const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateContactNumber = (contact: string) => {
  const contactRegex = /^09\d{9}$/;
  return contactRegex.test(contact);
};

const SignUp = () => {
  const [form, setForm] = useState({ full_name: '', contact: '', email: '', password: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSignUp = async () => {
    const { full_name, contact, email, password } = form;

    // Validate form fields
    if (!full_name || !contact || !email || !password) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    if (!validateContactNumber(contact)) {
      Alert.alert('Error', 'Contact number must start with "09" and have 11 digits.');
      return;
    }

    setIsSubmitting(true)
    try {
      const response = await fetch('http://192.168.1.3:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await response.json()

      if (response.ok) {
        Alert.alert('Success', 'Account created successfully!')
        router.replace('/sign-in')
      } else {
        Alert.alert('Error', data.error)
      }
    } catch (error) {
      Alert.alert('Network Error', 'Please try again later.')
    }
    setIsSubmitting(false)
  }

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView>
        <View className="w-[90%] justify-center min-h-[95vh] px-4 my-6 self-center">
          <Image source={images.logo} resizeMode="contain" className="w-[140px] h-[140px] self-center" />
          <Text className="text-2xl text-quaternary mt-[30px] font-psemibold">
            Sign up to <Text className="text-secondary">Snap & Found</Text>
          </Text>

          <FormField
            title="Full Name"
            value={form.full_name}
            handleChangeText={(e) => setForm({ ...form, full_name: e })}
            otherStyles="mt-7"
            placeholder=''
          />

          <FormField
            title="Contact Number"
            value={form.contact}
            handleChangeText={(e) => setForm({ ...form, contact: e })}
            otherStyles="mt-3"
            placeholder=''
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            keyboardType="email-address"
            otherStyles="mt-3"
            placeholder=''
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            placeholder=""
            otherStyles="mt-3"
          />

          <CustomButton
            title={isSubmitting ? 'Signing up...' : 'Sign up'}
            handlePress={handleSignUp}
            containerStyles="mt-7"
            disabled={isSubmitting}
          />

          <View className="justify-center pt-2 flex-row gap-2">
            <Text className="text-m text-quaternary font-pregular">Have an account already?</Text>
            <Link href="/sign-in" className="text-m text-secondary font-psemibold">
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp
