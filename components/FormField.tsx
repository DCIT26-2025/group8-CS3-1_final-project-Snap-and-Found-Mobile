import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';

import icons from '@/constants/icons';

interface FormFieldProps {
  title: string;
  value: string;
  placeholder: string;
  handleChangeText: (text: string) => void;
  otherStyles?: string;
  [key: string]: any;
}

const FormField: React.FC<FormFieldProps> = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {
  const [showPassword, setshowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="ml-1 text-base text-quaternary font-pmedium">{title}</Text>

      <View
        className={`border-2 w-full h-16 px-4 bg-tertiary rounded-xl items-center ${
          isFocused ? 'border-secondary' : 'border-primary'
        } flex-row` }
      >
        <TextInput
          className="flex-1 text-quaternary font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={(title === 'Password' && !showPassword) || (title === 'New Password' && !showPassword) || (title === 'Confirm Password' && !showPassword)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {(title === 'Password' || title === 'New Password' || title === 'Confirm Password') && (
            <TouchableOpacity onPress={() => setshowPassword(!showPassword)}>
              <Image source={!showPassword ? icons.eye : icons.eyeHide} className='w-6 h-6' resizeMode='contain'/>
            </TouchableOpacity>
        )}

      </View>
    </View>
  );
};

export default FormField;
