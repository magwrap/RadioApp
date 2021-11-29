import React from 'react';
import {StyleSheet, View} from 'react-native';
import LanguagePicker from '../radio/LanguagePicker';
import OrderPicker from '../radio/OrderPicker';

interface RadioHeaderPickersProps {}

const RadioHeaderPickers: React.FC<RadioHeaderPickersProps> = ({}) => {
  return (
    <View style={styles.row}>
      <OrderPicker />
      <LanguagePicker />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {flexDirection: 'row'},
});

export default RadioHeaderPickers;
