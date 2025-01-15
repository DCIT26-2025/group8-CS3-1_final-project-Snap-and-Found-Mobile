import { View, Text, Image } from 'react-native'
import React from 'react'
import { Link, router } from 'expo-router'

import icons from '@/constants/icons'
import CustomButton from './CustomButton'

interface EmptyStateProps {
  title: string;
  type: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({title, type}) => {
  return (
    <View className='justify-center items-center px-4 mt-[70px]'>
      <Image 
        source={icons.empty}
        className='w=[150px] h-[150px] mb-2 mt-7'
        resizeMode='contain'
      />

      <Text className='text-2xl text-center font-psemibold text-quaternary mt-2'>
        {title}
      </Text>
      
      {
        type === 'found' ? (
          <Text className="font-pmedium text-m text-quaternary">
            Found an item? <Link  className='text-secondary' href={'/Found'}>Add it to the list</Link>
          </Text>
        ) : (
          <Text className="font-pmedium text-m text-quaternary">
            Lost an item? <Link  className='text-secondary' href={'/Lost'}>Add it to the list</Link>
          </Text>
        )
      }
    </View>
  )
}

export default EmptyState