import useFirebaseRealtimeDB from '../../../hooks/useFirebaseRealtimeDB';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';

interface AddSongButtonProps {}

export type File = {
  uri: string;
  type: string | null;
  name: string;
  size: number | null;
};

const AddSongButton: React.FC<AddSongButtonProps> = ({}) => {
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState(false);
  const {addSong} = useFirebaseRealtimeDB();

  const add = () => {
    console.log('file size: ', file?.size);
    if (file && file.size && file.size > 2000000) {
      addSong(file, setLoading);
    }
  };

  const showPicker = async () => {
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.audio],
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
    <View style={filePickerStyles.container}>
      {!file?.name ? (
        <TouchableOpacity
          onPress={showPicker}
          style={filePickerStyles.uploadButton}>
          <Text style={filePickerStyles.text}>Pick a Song</Text>
        </TouchableOpacity>
      ) : (
        <View style={filePickerStyles.uploadButton}>
          <Text>{file.name}</Text>
        </View>
      )}

      {!loading ? (
        <TouchableOpacity onPress={add} style={filePickerStyles.addButton}>
          <Text style={filePickerStyles.text}>Upload it</Text>
        </TouchableOpacity>
      ) : (
        <View style={filePickerStyles.addButton}>
          <ActivityIndicator />
        </View>
      )}
    </View>
  );
};
const filePickerStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  uploadButton: {
    backgroundColor: 'cornflowerblue',
    height: 40,
    width: 100,
    borderRadius: 13,
    borderWidth: 0,
    justifyContent: 'center',
    marginRight: 10,
    padding: 2,
  },
  addButton: {
    backgroundColor: 'limegreen',
    height: 40,
    width: 80,
    borderRadius: 13,
    borderWidth: 0,
    justifyContent: 'center',
    marginRight: 10,
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AddSongButton;
