import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
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
        setUser(JSON.parse(storedUser));  // Load user from cache
      }
    };

    loadUserData();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('user');  // Remove user from cache
    router.replace('/sign-in');  // Redirect to sign-in
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      <View className="w-[95%] px-4 my-6 self-center">
        <View className="flex-row justify-between items-center">
          <Text className="text-2xl text-secondary font-psemibold">User Profile</Text>
          <TouchableOpacity onPress={handleLogout}>
            <Image source={icons.logout} resizeMode="contain" className="h-[30px] w-[30px]" />
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex-1">
        <ScrollView>
          <View className="w-[95%] min-h-[95vh] px-4 self-center">
            <Image source={icons.user} resizeMode="contain" className="h-[100px] w-[100px] self-center" />
            <Text className="text-2xl text-secondary font-pmedium self-center text-center mt-2">
              {user?.full_name || 'Guest'}
            </Text>

            <Text className="ml-1 text-base text-secondary font-pmedium mt-7 mb-1">ID</Text>
            <Text className="text-xl text-quaternary font-pregular">{user?.id || 'N/A'}</Text>

            <Text className="ml-1 text-base text-secondary font-pmedium mt-7 mb-1">Email</Text>
            <Text className="text-xl text-quaternary font-pregular">{user?.email || 'N/A'}</Text>

            <Text className="ml-1 text-base text-secondary font-pmedium mt-7 mb-1">Contact Number</Text>
            <Text className="text-xl text-quaternary font-pregular">{user?.contact || 'N/A'}</Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
