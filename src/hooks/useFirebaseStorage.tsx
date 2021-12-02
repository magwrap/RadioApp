import storage from '@react-native-firebase/storage';
// import {utils} from '@react-native-firebase/app';

const useFirebaseStorage = () => {
  // create bucket storage reference to not yet existing image

  const uploadFile = async (fileName: string, path: string) => {
    //TODO: czesto wystepuje Possible Unhandled Promise Rejection
    try {
      const reference = storage().ref(fileName);
      // const pathToFile = `${utils.FilePath.PICTURES_DIRECTORY}/black-t-shirt-sm.png`;
      const pathToFile = path;
      // uploads file
      await reference.putFile(pathToFile);
      const url = await storage().ref(fileName).getDownloadURL();
      // const task = reference.putFile(pathToFile);

      // task.on('state_changed', taskSnapshot => {
      //   console.log(
      //     `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      //   );
      // });

      // task.then(() => {
      //   console.log('Image uploaded to the bucket!');
      // });
      return url;
    } catch (err) {
      console.error(err);
    }
  };

  return {
    uploadFile,
  };
};

export default useFirebaseStorage;
