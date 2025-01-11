import { View, Text, ScrollView, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import images from '@/constants/images'
import EmptyState from '@/components/EmptyState'

const Dashboard = () => {
  return (
    <SafeAreaView className='h-full bg-primary'>
      <FlatList 
        // data={[{key: 'a'}, {key: 'b'}]}
        data={[]}
        keyExtractor={(item) => item.key}
        renderItem={({item}) => (
          <View>
            <Text className='text-3xl'>{item.key}</Text>
          </View>
        )}
        ListHeaderComponent={() => (
          <View className='my-6 px-4 space-y-6'>
            <View className='justify-between items-start flex-row mb-6'>
              <View>
                <Text className='font-pmedium text-sm text-quaternary'>Welcome, </Text>
                <Text className='text-2xl font-psemibold text-secondary'>Guest</Text>
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
          <EmptyState
            title='No Items Found'
          />
        )}
      />
    </SafeAreaView>
  )
}

export default Dashboard