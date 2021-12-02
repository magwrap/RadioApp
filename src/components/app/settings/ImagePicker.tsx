import useFirebaseStorage from '../../../hooks/useFirebaseStorage';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';

type File = {
  uri: string;
  type: string | null;
  name: string;
  size: number | null;
};

interface ImagePickerProps {
  setPhotoURL: React.Dispatch<React.SetStateAction<string>>;
}

const ImagePicker: React.FC<ImagePickerProps> = ({setPhotoURL}) => {
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState(false);
  const {uploadFile} = useFirebaseStorage();

  const uploadImage = async () => {
    if (file) {
      setLoading(true);
      const url = await uploadFile(file.name, file.uri);
      setPhotoURL(url);
      setLoading(false);
    }
  };

  const pickImage = async () => {
    try {
      const results = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      for (const res of results) {
        let fileRes = {
          uri: res.uri,
          type: res.type, // mime type
          name: res.name,
          size: res.size,
        };
        console.log(fileRes);
        setFile(fileRes);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  return (
    <View>
      {file?.uri ? (
        <Image source={{uri: file.uri}} style={styles.img} />
      ) : (
        <View style={styles.img}>
          <Text style={styles.text}>Upload your photo</Text>
        </View>
      )}

      <View style={styles.container}>
        <TouchableOpacity onPress={pickImage} style={styles.pickButton}>
          <Text>Pick an image</Text>
        </TouchableOpacity>
        {!loading ? (
          <TouchableOpacity onPress={uploadImage} style={styles.uploadButton}>
            <Text>Upload it</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.uploadButton}>
            <ActivityIndicator />
          </View>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  pickButton: {
    backgroundColor: 'limegreen',
    borderRadius: 13,
    padding: 10,
    margin: 10,
  },
  uploadButton: {
    backgroundColor: 'cornflowerblue',
    borderRadius: 13,
    padding: 10,
    margin: 10,
  },
  text: {
    margin: 10,
    fontStyle: 'italic',
  },
  img: {width: 200, height: 200, margin: 10, justifyContent: 'center'},
});

export default ImagePicker;
