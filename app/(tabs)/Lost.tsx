import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import Dropdown from '@/components/DropDown'
import icons from '@/constants/icons'
import CustomButton from '@/components/CustomButton'
import { router } from 'expo-router'

const Lost = () => {
  return (
    <SafeAreaView className='h-full bg-primary'>
      <ScrollView>
        <View className='w-[95%] min-h-[95vh] px-4 my-6 self-center'>
          <Text className='font-pregular text-2xl text-secondary font-psemibold mb-7'>Lost an Item?</Text>

          <Text className="ml-1 text-base text-quaternary font-pmedium mb-1">Select a Category</Text>
          <Dropdown
            data={[
              {value: 'electronics',label: 'Gadgets/Electronics'},
              {value: 'clothing',label: 'Clothing/Accesories'},
              {value: 'school',label: 'School Supplies'},
              {value: 'personal;',label: 'Personal Items'},
            ]}
            onChange={(value) => console.log(value)}
            placeholder='No Category Selected'
          />

          <Text className="ml-1 text-base text-quaternary font-pmedium mt-7 mb-1">Image</Text>
           <TouchableOpacity onPress={() => console.log("Picker triggered")}>
            <View className="w-[100%] h-16 px-4 bg-tertiary rounded-xl justify-center items-center self-center border-2 border-secondary flex-row space-x-2">
              <Image
                source={icons.upload}
                resizeMode="contain"
                className="w-6 h-6"
              />

              <Text className="text-sm text-quaternary font-pmedium ml-2">
                Upload an Image
              </Text>
            </View>
          </TouchableOpacity>

          <CustomButton
            title='Find Matches'
            handlePress={() => router.push('/Dashboard')}
            containerStyles={'mt-7'}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Lost