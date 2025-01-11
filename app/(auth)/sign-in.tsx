import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import images from '@/constants/images'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { Link, router } from 'expo-router'

const SignIn = () => {
  const [form, setForm] = useState({
    email:'',
    password:''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView>
        <View className='w-[90%] justify-center min-h-[95vh] px-4 my-6 self-center'>
          <Image 
            source={images.logo}
            resizeMode='contain'
            className='w-[180px] h-[180px] self-center'
          />

          <Text className='text-2xl text-quaternary mt-[55px] font-psemibold'>
            Sign in to <Text className='text-secondary'>Snap & Found</Text>
          </Text>

          <FormField
            title='Email'
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles={'mt-7'}
            keyboardType="email-address"
            placeholder={''}
          />

          <FormField
            title='Password'
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e})}
            otherStyles={'mt-3'}
            placeholder={''}
          />

          <CustomButton
            title='Sign in'
            handlePress={() => router.replace('/Dashboard')}
            containerStyles={'mt-7'}
          />

          <View className='justify-center pt-2 flex-row gap-2'>
            <Text className='text-m text-quaternary font-pregular'>
              Don't have an account?
            </Text>
            <Link href='/sign-up' className='text-m text-secondary font-psemibold'>
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn