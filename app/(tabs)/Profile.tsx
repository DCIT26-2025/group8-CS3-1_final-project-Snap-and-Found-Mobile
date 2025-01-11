import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import icons from '@/constants/icons'
import { router } from 'expo-router'
import CustomButton from '@/components/CustomButton'

const Profile = () => {
  return (
    <SafeAreaView className='h-full bg-primary'>
      <View className='flex-1'>
        <ScrollView>
          <View className='w-[95%] min-h-[95vh] px-4 my-6 self-center'>
            <Text className='text-2xl text-secondary font-psemibold'>User Profile</Text>
            <View>
              
            </View>
            <Image
              source={icons.user}
              resizeMode='contain'
              className='h-[100px] w-[100px] self-center mt-7'
            />
            <Text className='text-2xl text-secondary font-pmedium self-center text-center mt-2'>Guest</Text>

            <Text className="ml-1 text-base text-secondary font-pmedium mt-7 mb-1">Email</Text>
            <Text className='text-xl text-quaternary font-pregular'>snapnfound.mobile@gmail.com</Text>

            <Text className="ml-1 text-base text-secondary font-pmedium mt-7 mb-1">Contact Number</Text>
            <Text className='text-xl text-quaternary font-pregular'>09168936788</Text>
          </View>
        </ScrollView>
        <View className='px-4 mb-10'>
          <CustomButton
            title='Log Out'
            handlePress={() => router.replace('/sign-up')}
            containerStyles={'mt-7 w-[95%] self-center'}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Profile