import React, {
  useState,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

const AuthContext = createContext<{
  currentUser: FirebaseAuthTypes.User | null;
  login: (
    email: string,
    password: string,
    setMessage: Dispatch<SetStateAction<string>>,
  ) => void;
  register: (
    email: string,
    password: string,
    setMessage: Dispatch<SetStateAction<string>>,
  ) => void;
  logout: () => void;
  updateProfile: (displayName: string, photoURL: string) => Promise<void>;
  updatePassword: (
    password: string,
    setMessage: Dispatch<SetStateAction<string>>,
  ) => Promise<void>;
  deleteProfile: () => Promise<void>;
  sendPasswordResetEmail: (
    setMessage: Dispatch<SetStateAction<string>>,
    email?: string,
  ) => Promise<void>;
  signInAnonymously: () => Promise<void>;
}>({
  currentUser: null,
  login: () => {},
  register: () => {},
  logout: () => {},
  updateProfile: async () => {},
  updatePassword: async () => {},
  deleteProfile: async () => {},
  sendPasswordResetEmail: async () => {},
  signInAnonymously: async () => {},
});

export const useAuthContext = () => useContext(AuthContext);

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [currentUser, setCurrentUser] = useState<FirebaseAuthTypes.User | null>(
    null,
  );
  const signInAnonymously = async () => {
    auth()
      .signInAnonymously()
      .then(() => {
        console.log('User signed in anonymously');
      })
      .catch(error => {
        if (error.code === 'auth/operation-not-allowed') {
          console.log('Enable anonymous in your firebase console.');
        }
        console.error(error);
      });
  };

  const register = (
    email: string,
    password: string,
    setMessage: Dispatch<SetStateAction<string>>,
  ) => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        const user = auth().currentUser;
        setCurrentUser(user);
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          setMessage('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          setMessage('That email address is invalid!');
        } else {
          setMessage(error.message);
        }
      });
  };

  const login = (
    email: string,
    password: string,
    setMessage: Dispatch<SetStateAction<string>>,
  ) => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        const user = auth().currentUser;
        setCurrentUser(user);
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          setMessage('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          setMessage('That email address is invalid!');
        } else {
          setMessage(error.message);
        }
      });
  };

  const logout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));

    setCurrentUser(null);
  };

  const updateProfile = async (
    displayName: string,
    photoURL: string = 'https://my-cdn.com/assets/user/123.png',
  ) => {
    const update = {
      displayName: displayName,
      photoURL: photoURL,
    };

    const user = auth().currentUser;
    await user?.updateProfile(update);
    setCurrentUser(user);
  };

  const sendPasswordResetEmail = async (
    setMessage: Dispatch<SetStateAction<string>>,
    email?: string,
  ) => {
    try {
      if (email) {
        auth().sendPasswordResetEmail(email);
      } else {
        const user = auth().currentUser;
        if (user?.email) {
          auth().sendPasswordResetEmail(user.email);
        }
      }
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  const updatePassword = async (
    password: string,
    setMessage: Dispatch<SetStateAction<string>>,
  ) => {
    try {
      const user = auth().currentUser;
      await user?.updatePassword(password);
      setCurrentUser(user);
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  const deleteProfile = async () => {
    await auth().currentUser?.delete();
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
        register,
        updateProfile,
        updatePassword,
        deleteProfile,
        sendPasswordResetEmail,
        signInAnonymously,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
