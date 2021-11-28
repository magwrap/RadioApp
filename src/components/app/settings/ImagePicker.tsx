import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

interface ImagePickerProps {}

const ImagePicker: React.FC<ImagePickerProps> = ({}) => {
  const onLaunchCamera = async () => {
    const result = await launchCamera({mediaType: 'photo'});
    // const data = result.json();
    console.log('result1:', JSON.stringify(result));
  };

  const onLaunchImageLibary = async () => {
    const result = await launchImageLibrary({mediaType: 'photo'});
    console.log('result2:', JSON.stringify(result));
  };

  return (
    <View>
      <Text>Image Picker</Text>
      <Button title="From camera" onPress={onLaunchCamera} />
      <Button title="From gallery" onPress={onLaunchImageLibary} />
    </View>
  );
};
// const styles = StyleSheet.create({});

export default ImagePicker;

//  https://enappd.com/blog/pick-images-from-camera-gallery-in-react-native-app/78/
// https://github.com/react-native-image-picker/react-native-image-picker/tree/main/src
// TODO: dodac react-native-image-picker do tego firebase/store
