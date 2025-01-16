import { View, Text, ScrollView, FlatList, TouchableOpacity, Image, Alert, RefreshControl, Modal, Animated } from 'react-native';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import images from '@/constants/images';
import EmptyState from '@/components/EmptyState';
import icons from '@/constants/icons';

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const opacity = useRef(new Animated.Value(0)).current;

  const fetchItems = async () => {
    try {
      const response = await fetch('http://192.168.1.3:5000/items');
      const data = await response.json();
      if (data.items) {
        setItems(data.items.reverse());
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
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
    fetchItems();
  }, []);

  const handleItemPress = (item: any) => {
    setSelectedItem(item);
    setModalVisible(true);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handleCloseModal = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
    });
  };

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  interface Item {
    uploader_avatar: string;
    item_id: string;
    item_name: string;
    category: string;
    image: string;
    uploader: string;
    contact: string;
    type: string;
  }

  const renderItem = ({ item }: { item: Item }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => handleItemPress(item)}
    >
      <View className="bg-white rounded-lg mx-6 mb-4 p-4 shadow">
        <View className='flex-row mb-3'>
          <Image 
            source={{ uri: item.uploader_avatar }}
            className={`w-[40px] h-[40px] rounded-full`}
            resizeMode="cover"
          />
          <View className='justify-center'>
            <Text className="ml-2 text-m font-pmedium text-quaternary">{item.uploader}</Text>
            <View style={{alignSelf: 'flex-start', paddingHorizontal: 8, borderRadius: 4 }}>
              <Text className="text-xs font-pmedium text-primary bg-secondary pl-2 pr-2 rounded-full">{capitalizeFirstLetter(item.type)}</Text>
            </View>
          </View>
        </View>
        <Image 
          source={{ uri: item.image }}
          className="w-full h-48 rounded-lg"
          resizeMode="cover"
        />
        <View className="mt-2">
          <Text className="text-lg font-psemibold text-secondary">
            {item.item_name}
          </Text>
          <Text className="text-sm font-pmedium text-quaternary">
            {item.category}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className='h-full bg-primary'>
      <FlatList
        data={items}
        keyExtractor={(item) => item.item_id}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#3E9B3D"
            colors={['#3E9B3D']}
          />
        }
        ListHeaderComponent={() => (
          <View className='my-6 px-6 space-y-6'>
            <View className='justify-between items-start flex-row'>
              <View>
                <Text className='font-pmedium text-sm text-quaternary'>Welcome, </Text>
                <Text className='text-2xl font-psemibold text-secondary'>
                  {user ? user.full_name : 'Guest'}
                </Text>
              </View>

              <TouchableOpacity
                activeOpacity={0.8}
              >
                <View className='mt-3'>
                  <Image
                    source={images.logo}
                    resizeMode='contain'
                    className='h-11 w-11 justify-center'
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title='No Items at the Moment'
          />
        )}
      />

      {selectedItem && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleCloseModal}
        >
          <Animated.View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.4)', opacity }}>
            <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 20, width: '90%', height: '80%' }}>
              <View className='mb-2'>
                <TouchableOpacity
                  style={{ alignItems: 'flex-end'}}
                  onPress={handleCloseModal}
                >
                  <Image
                    source={icons.close}
                    style={{ width: 15, height: 15 }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
              <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}>
                <View>
                  <Text className='text-quaternary font-psemibold text-xl'>{selectedItem.item_name}</Text>
                  <Text className='text-quaternary font-pmedium mb-2 text-xs' style={{color: '#666'}}>ID:  {selectedItem.item_id}</Text>
                  <View className='flex-row'style={{alignSelf: 'flex-start', borderRadius: 4 }}>
                    <Text className="text-[12px] font-pmedium text-primary bg-secondary pl-2 pr-2 rounded-full mr-1">{capitalizeFirstLetter(selectedItem.type)}</Text>
                    <Text className="text-[12px] font-pmedium text-primary bg-secondary pl-2 pr-2 rounded-full">{selectedItem.category}</Text>
                  </View>
                </View>

                <Image 
                  source={{ uri: selectedItem.image }}
                  style={{ width: '100%', height: 200, borderRadius: 10, marginTop: 10 }}
                  resizeMode="cover"
                />
                <View>
                  <Text className="text-base text-secondary font-psemibold mt-7 mb-1">DESCRIPTION</Text>
                  <Text className='text-m font-pregular text-quaternary' style={{ textAlign: 'justify' }}>
                    {selectedItem.description}
                  </Text>
                </View>

                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                  <View className='flex-row items-center'>
                    <Image
                      source={{ uri: selectedItem.uploader_avatar }}
                      style={{ width: 23, height: 23, borderRadius: 20, marginTop: 10 }}
                      resizeMode="cover"
                      className='mr-2'
                    />
                    <Text className="font-pregular" style={{ fontSize: 12, fontWeight: '500', color: '#666', marginTop: 10 }}>
                      {selectedItem.uploader}
                    </Text>
                  </View>

                  <View className='flex-row items-center'>
                    <Image
                      source={icons.contact}
                      style={{ width: 20, height: 20, borderRadius: 20, marginTop: 10 }}
                      resizeMode="cover"
                      className='mr-2 ml-1'
                    />
                    <Text className="font-pregular" style={{ fontSize: 12, fontWeight: '500', color: '#666', marginTop: 10 }}>
                      {selectedItem.contact}
                    </Text>
                  </View> 
                </View>
              </ScrollView>
            </View>
          </Animated.View>
        </Modal>
      )}
    </SafeAreaView>
  );
};

export default Dashboard;