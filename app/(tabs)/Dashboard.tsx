import { View, Text, ScrollView, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import images from '@/constants/images';
import EmptyState from '@/components/EmptyState';

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);

  // Retrieve user data from AsyncStorage on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData)); // Parse and set the user data
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <SafeAreaView className='h-full bg-primary'>
      <FlatList
        // data={[{ key: 'a' }, { key: 'b' }]}
        data={[]}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View>
            <Text className='text-3xl'>{item.key}</Text>
          </View>
        )}
        ListHeaderComponent={() => (
          <View className='my-6 px-4 space-y-6'>
            <View className='justify-between items-start flex-row mb-6'>
              <View>
                <Text className='font-pmedium text-sm text-quaternary'>Welcome, </Text>
                <Text className='text-2xl font-psemibold text-secondary'>
                  {user ? user.full_name : 'Guest'}
                </Text>
              </View>

              <View className='mt-1.5'>
                <Image
                  source={images.logo}
                  resizeMode='contain'
                  className='h-12 w-12'
                />
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState title='No Items Found' />
        )}
      />
    </SafeAreaView>
  );
};

export default Dashboard;
