import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import Dropdown from '@/components/DropDown'
import icons from '@/constants/icons'
import CustomButton from '@/components/CustomButton'
import { router } from 'expo-router'
import FormField from '@/components/FormField'

const Lost = () => {
  const [form, setForm] = useState({
    title:'',
    description:''
  })
  
  return (
    <SafeAreaView className='h-full bg-primary'>
      <View className='w-[95%] px-6 mt-6 h-[45px]'>
        <Text className='font-pregular text-2xl text-secondary font-psemibold mb-7'>Lost an Item?</Text>
      </View>

      <ScrollView>
        <View className='w-[95%] min-h-[95vh] px-4 self-center'>

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

          <FormField
            title='Item Title'
            value={form.title}
            handleChangeText={(e) => setForm({ ...form, title: e })}
            otherStyles={'mt-7'}
            placeholder={''}
          />

          <FormField
            title='Description'
            value={form.description}
            handleChangeText={(e) => setForm({ ...form, description: e })}
            otherStyles={'mt-7'}
            placeholder={''}
            multiline={true}
            numberOfLines={4}
          />

          <CustomButton
            title='Submit'
            handlePress={() => router.push('/Dashboard')}
            containerStyles={'mt-7'}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Lost