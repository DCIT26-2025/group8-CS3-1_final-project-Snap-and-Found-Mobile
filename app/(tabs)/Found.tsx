import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as ImagePicker from 'expo-image-picker'
import { router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage';

import Dropdown from '@/components/DropDown'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import icons from '@/constants/icons'

const Found = () => {
  const [form, setForm] = useState({
    type: 'found',
    category: '',
    title: '',
    description: '',
    image: null as string | null
  })

  const [uploaderInfo, setUploaderInfo] = useState<any>(null);

  useEffect(() => {
    const loadUploaderInfo = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) setUploaderInfo(JSON.parse(storedUser));
    };
    loadUploaderInfo();
  }, []);

  const openPicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      alert('Sorry, we need media library permissions to make this work!')
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    })

    if (!result.canceled) {
      setForm({ ...form, image: result.assets[0].uri })
    }
  }

  const handleSubmit = async () => {
    try {
      if (!form.title || !form.description || !form.category) {
        Alert.alert('Error', 'Please fill all required fields.');
        return;
      }

      const data = new FormData();
      data.append('type', form.type);
      data.append('category', form.category);
      data.append('item_name', form.title);
      data.append('description', form.description);
      data.append('uploader', uploaderInfo?.full_name || '');
      data.append('contact', uploaderInfo?.contact || '');
      data.append('uploader_avatar', uploaderInfo?.avatar || '');
      
      if (form.image) {
        const uriParts = form.image.split('.');
        const fileType = uriParts[uriParts.length - 1];

        data.append('image', {
          uri: form.image,
          name: `photo.${fileType}`,
          type: `image/${fileType}`
        } as any);
        
      }

      const response = await fetch('http://192.168.1.3:5000/upload_item', {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        },
      });

      const result = await response.json();

      if (!response.ok) {
        Alert.alert('Error', result.message || 'Failed to submit the form.');
        return;
      }

      Alert.alert('Success', result.message);
      setForm({
        type: 'found',
        category: '',
        title: '',
        description: '',
        image: null
      });

    } catch (error) {
      Alert.alert('Error', 'Failed to submit the form.');
    }
  };

  return (
    <SafeAreaView className='h-full bg-primary'>
      <View className='w-[95%] px-6 mt-6 h-[45px]'>
        <Text className='font-pregular text-2xl text-secondary font-psemibold mb-7'>Found an Item?</Text>
      </View>

      <ScrollView>
        <View className='w-[95%] min-h-[95vh] px-4 self-center'>
          <Text className="ml-1 text-base text-quaternary font-pmedium mb-1">Select a Category</Text>
          <Dropdown
            data={[
              { value: 'Gadgets/Electronics', label: 'Gadgets/Electronics' },
              { value: 'Clothing/Accesories', label: 'Clothing/Accesories' },
              { value: 'School Supplies', label: 'School Supplies' },
              { value: 'Personal Items', label: 'Personal Items' },
              { value: 'Others', label: 'Others' },
            ]}
            onChange={(e) => setForm({ ...form, category: e.value })}
            placeholder='No Category Selected'
          />

          <Text className="ml-1 text-base text-quaternary font-pmedium mt-7 mb-1">Image</Text>
          <TouchableOpacity onPress={openPicker}>
            {form.image ? (
              <View className='w-[100%] h-[200px] border-2 border-secondary border-dashed rounded-xl items-center justify-center'>
                <Image
                  source={{ uri: form.image }}
                  className='rounded-[6px] w-[98%] h-[97%]'
                />
              </View>
            ) : (
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
            )}
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
            handlePress={handleSubmit}
            containerStyles={'mt-7'}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Found