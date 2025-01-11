import { View, Text, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router } from 'expo-router'

import FormField from '@/components/FormField'
import images from '@/constants/images'
import CustomButton from '@/components/CustomButton'

const SignUp = () => {
  const [form, setForm] = useState({
    name: '',
    contact: '',
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
            className='w-[140px] h-[140px] self-center'
          />

          <Text className='text-2xl text-quaternary mt-[30px] font-psemibold'>
            Sign up to <Text className='text-secondary'>Snap & Found</Text>
          </Text>

          <FormField
            title='Full Name'
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, name: e })}
            otherStyles={'mt-7'}
            keyboardType="email-address"
            placeholder={''}
          />

          <FormField
            title='Contact Number'
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, contact: e })}
            otherStyles={'mt-3'}
            keyboardType="email-address"
            placeholder={''}
          />

          <FormField
            title='Email'
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles={'mt-3'}
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
            title='Sign up'
            handlePress={() => router.replace('/Dashboard')}
            containerStyles={'mt-7'}
          />

          <View className='justify-center pt-2 flex-row gap-2'>
            <Text className='text-m text-quaternary font-pregular'>
              Have an account already?
            </Text>
            <Link href='/sign-in' className='text-m text-secondary font-psemibold'>
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp