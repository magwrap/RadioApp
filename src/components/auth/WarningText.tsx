import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface WarningsProps {
  value: string;
  viewWarnings: boolean;
}

export const WarningText: React.FC<WarningsProps> = ({value, viewWarnings}) => {
  return (
    <View>
      <Text style={styles.text}>
        {value || !viewWarnings ? '' : 'This field is required'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    marginTop: 5,
    fontSize: 12,
    color: 'red',
  },
});
