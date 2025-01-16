import { View, Text, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import icons from '@/constants/icons';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const loadUserData = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };

    loadUserData();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('user');
    router.replace('/sign-in');
  };

  const mockUploadedItems = [
    { id: '1', title: 'Lost Wallet', description: 'Brown leather wallet', date: '2025-01-01' },
    { id: '2', title: 'Car Keys', description: 'Toyota car keys with keychain', date: '2025-01-02' },
    { id: '3', title: 'Umbrella', description: 'Black foldable umbrella', date: '2025-01-03' },
  ];

  const renderUploadedItems = () => {
    return mockUploadedItems.map((item) => (
      <View
        key={item.id}
        className="h-[100px] bg-tertiary flex-row justify-between px-5 py-3 mb-3 rounded-lg"
      >
        <View>
          <Text className="text-lg text-quaternary font-pmedium">{item.title}</Text>
          <Text className="text-sm text-secondary font-pregular">{item.description}</Text>
          <Text className="text-sm text-quaternary font-pthin">{item.date}</Text>
        </View>
        <TouchableOpacity className="self-center bg-primary px-4 py-2 rounded-md">
          <Text className="text-sm text-white font-pmedium">View</Text>
        </TouchableOpacity>
      </View>
    ));
  };


  return (
    <SafeAreaView className="h-full bg-primary">
      <View className="w-[95%] px-4 my-6 self-center">
        <View className="flex-row justify-between items-center">
          <Text className="text-2xl text-secondary font-psemibold">User Profile</Text>
          <TouchableOpacity onPress={handleLogout}>
            <Image source={icons.logout} resizeMode="contain" className="h-[25px] w-[25px]" />
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex-1">
        <ScrollView>
          <View className="w-[95%] min-h-[95vh] px-4 self-center">
            <View className='border-2 w-[33%] self-center pt-1 pb-1 border-secondary rounded-full'>
              <Image
                source={user?.avatar ? { uri: user.avatar } : icons.user}
                resizeMode="contain"
                className="h-[90px] w-[90px] self-center rounded-full"
              />
            </View>
            <Text className="text-2xl text-quaternary font-pmedium self-center text-center mt-2">
              {user?.full_name || 'Guest'}
            </Text>

            <Text className="ml-1 text-base text-secondary font-pmedium mt-7 mb-1">PERSONAL INFO</Text>

            <View className='h-[70px] bg-tertiary flex-row justify-between pr-5 pl-5 items-center mb-1 rounded-tl-3xl rounded-tr-3xl'>
              <View className='flex-row items-center'>
                <Image
                  source={icons.id}
                  resizeMode="contain"
                  className="h-[30px] w-[30px] mr-3"
                />
                <Text className="text-m text-quaternary font-pmedium mr-[60px]">ID</Text>
              </View>
              <Text className="text-m text-quaternary font-pregular text-right flex-1 flex-wrap">{user?.id || 'N/A'}</Text>
            </View>

            <View className='h-[70px] bg-tertiary flex-row justify-between pr-5 pl-5 items-center mb-1'>
              <View className='flex-row items-center'>
                <Image
                  source={icons.email}
                  resizeMode="contain"
                  className="h-[28px] w-[28px] mr-3"
                />
                <Text className="text-m text-quaternary font-pmedium mr-[60px]">Email</Text>
              </View>
              <Text className="text-m text-quaternary font-pregular text-right flex-1 flex-wrap">{user?.email || 'N/A'}</Text>
            </View>

            <View className='h-[70px] bg-tertiary flex-row justify-between pr-5 pl-5 items-center mb-1 rounded-bl-3xl rounded-br-3xl'>
              <View className='flex-row items-center'>
                <Image
                  source={icons.contact}
                  resizeMode="contain"
                  className="h-[25px] w-[25px] mr-4"
                />
                <Text className="text-m text-quaternary font-pmedium mr-[60px]">Contact</Text>
              </View>
              <Text className="text-m text-quaternary font-pregular text-right flex-1 flex-wrap">{user?.contact || 'N/A'}</Text>
            </View>

            <Text className="ml-1 text-base text-secondary font-pmedium mt-7 mb-1">UPLOADED ITEMS</Text>

             {mockUploadedItems.length > 0 ? (
                renderUploadedItems()
              ) : (
                <Text className="text-m text-quaternary font-pmedium mt-4 text-center">
                  No items uploaded yet.
                </Text>
              )}
            
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
