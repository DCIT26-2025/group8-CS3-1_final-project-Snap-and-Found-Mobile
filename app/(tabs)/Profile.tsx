import { View, Text, ScrollView, Image, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import icons from '@/constants/icons';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  interface Item {
    uploader_avatar: string;
    item_id: string;
    item_name: string;
    category: string;
    image: string;
    uploader: string;
    contact: string;
    type: string;
    description: string;
  }

  const fetchItems = async () => {
    if (!user?.avatar) return;
    
    try {
      const response = await fetch('http://192.168.1.3:5000/items');
      const data = await response.json();
      if (data.items) {
        const filteredItems = data.items.filter((item: any) => item.uploader_avatar === user.avatar);
        setItems(filteredItems.reverse());
      }
    } catch (error) {
      console.error('Error fetching items:', error);
      Alert.alert('Error', 'Failed to load items');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await fetchItems();
    } catch (error) {
      console.error('Error refreshing items:', error);
    } finally {
      setRefreshing(false);
    }
  }, [user]);

  useEffect(() => {
    const loadUserData = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };

    loadUserData();
  }, []);

  useEffect(() => {
    if (user) {
      fetchItems();
    }
  }, [user]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('user');
    router.replace('/sign-in');
  };

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const handleItemPress = (itemId: string) => {
    setSelectedItemId((prevSelectedItemId) => (prevSelectedItemId === itemId ? null : itemId));
  };

  const renderItems = () => {
    return items.map((item) => (
      <TouchableOpacity
        activeOpacity={0.8}
        key={item.item_id}
        onPress={() => handleItemPress(item.item_id)}
      >
        <View className="bg-tertiary flex-row justify-between px-5 py-3 mb-2 pb-5 rounded-lg">
          <View>
            <Text className="text-m text-quaternary font-pmedium">{item.item_name}</Text>
            <Text style={{color: '#666'}}className="text-xs font-pmedium mb-2">ID:{item.item_id}</Text>
            <View className='flex-row'>
              <Text className="mr-1 text-xs font-pmedium text-primary bg-secondary pl-2 pr-2 rounded-full">{capitalizeFirstLetter(item.type)}</Text>
              <Text className="text-xs font-pmedium text-primary bg-secondary pl-2 pr-2 rounded-full">{item.category}</Text>
            </View>
            {selectedItemId === item.item_id && (
              <>
                <Image
                  source={{ uri: item.image }}
                  className="w-[278px] h-48 rounded-lg mt-3 mb-1"
                  resizeMode="cover"
                />
                <Text className="text-sm text-secondary font-pmedium mt-2">DESCRIPTION</Text>
                <Text className="text-sm text-quaternary font-pregular">{item.description}</Text>
              </>
            )}
          </View>
        </View>
      </TouchableOpacity>
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
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#3E9B3D"
              colors={['#3E9B3D']}
            />
          }
        >
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

            <View className='h-[70px] bg-tertiary flex-row justify-between pr-5 pl-5 items-center mb-2 rounded-tl-lg rounded-tr-lg'>
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

            <View className='h-[70px] bg-tertiary flex-row justify-between pr-5 pl-5 items-center mb-2'>
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

            <View className='h-[70px] bg-tertiary flex-row justify-between pr-5 pl-5 items-center mb-1 rounded-bl-lg rounded-br-lg'>
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

            {items.length > 0 ? (
              renderItems()
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