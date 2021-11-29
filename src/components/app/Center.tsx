import React from 'react';
import {StyleSheet, View} from 'react-native';

interface CenterProps {
  children?: React.ReactNode;
}

const Center: React.FC<CenterProps> = ({children}) => {
  return <View style={styles.container}>{children}</View>;
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Center;
