import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router'

import icons from '@/constants/icons'
import { StatusBar } from 'expo-status-bar';

interface TabIconProps {
  icon: any;
  color: string;
  name: string;
  focused: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({ icon, color, name, focused }) => {
  return (
    <View className={`items-center justify-center gap-1 mt-7`}>
      <Image
        source={icon}
        resizeMode='contain'
        tintColor={color}
        className={`w-6 h-6`}
      />

      <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-sm w-[100%]`} style={{color: color}}>
        {name}
      </Text>
    </View>
  )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#3e9b3d',
          tabBarInactiveTintColor: '#808080',
          tabBarStyle: {
            backgroundColor: '#faf8f6',
            borderTopWidth: 0,
            borderTopColor: '#773adb',
            height: 64
          }
        }}
      >
        <Tabs.Screen 
          name='Dashboard'
          options={{
            title: 'Dashboard',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon 
                icon={icons.home}
                color={color}
                name='Dashboard'
                focused={focused}
              />
            )
          }}   
        />

        <Tabs.Screen 
          name='Found'
          options={{
            title: 'Found',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => ( 
              <TabIcon 
                icon={icons.found}
                color={color}
                name='Found'
                focused={focused}
              />
            )
          }}   
        />

        <Tabs.Screen 
          name='Lost'
          options={{
            title: 'Lost',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon 
                icon={icons.lost}
                color={color}
                name='Lost'
                focused={focused}
              />
            )
          }}   
        />

        <Tabs.Screen 
          name='Profile'
          options={{
            title: 'Profile',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon 
                icon={icons.profile}
                color={color}
                name='Profile'
                focused={focused}
              />
            )
          }}   
        />
      </Tabs>
      <StatusBar backgroundColor='#faf8f6' style='dark'/>
    </>
  )
}

export default TabsLayout