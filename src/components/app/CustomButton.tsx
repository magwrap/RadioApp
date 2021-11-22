import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  style?: object;
}

const CustomButton: React.FC<CustomButtonProps> = ({title, onPress, style}) => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
