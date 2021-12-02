import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {useEffect, useState} from 'react';
import {Song} from './PlayerProvider';
import nextId from 'react-id-generator';
import {File} from 'components/app/music/AddSongButton';
import useFirebaseStorage from './useFirebaseStorage';

type Songs = Song[] | FirebaseFirestoreTypes.DocumentData[] | null;

const useFirebaseRealtimeDB = () => {
  const [songs, setSongs] = useState<Songs>(null);
  const {uploadFile} = useFirebaseStorage();

  useEffect(() => {
    getSongs();
  }, []);

  const getSongs = async () => {
    //TODO: dodac filter - w jakiej kolejnosci pobiera piosneki - tak jak w radiu
    try {
      let songquery: FirebaseFirestoreTypes.DocumentData[] = [];
      firestore()
        .collection('songs')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(documentSnapshot => {
            songquery?.push(documentSnapshot.data());
          });
          setSongs(songquery);
        });
    } catch (err) {
      console.error(err);
    }
  };

  const addSong = async (
    file: File,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    setLoading(true);
    try {
      const url = await uploadFile(file.name, file.uri);
      let song = {
        title: file.name,
        MediaId: nextId(),
        songUrl: url,
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/musicplayer-5a9c5.appspot.com/o/preview.png?alt=media&token=5e2452e7-2de7-4dba-9f09-8ed92f2fe759',
      };
      firestore()
        .collection('songs')
        .add(song)
        .then(() => {
          setSongs([...songs, song]);
        });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    songs,
    addSong,
  };
};

export default useFirebaseRealtimeDB;
