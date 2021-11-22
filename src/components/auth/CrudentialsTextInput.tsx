import React, {Dispatch, SetStateAction} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {WarningText} from './WarningText';

interface CrudentialsTextInputProps {
  type?: 'email' | 'password';
  value: string;
  onChangeText: Dispatch<SetStateAction<string>>;
  placeholder?: string;
  label?: string;
  viewWarnings?: boolean;
}

const CrudentialsTextInput: React.FC<CrudentialsTextInputProps> = ({
  type,
  value,
  onChangeText,
  placeholder = '',
  label = '',
  viewWarnings = false,
}) => {
  const borderColor = {borderColor: value || !viewWarnings ? 'black' : 'red'};
  return (
    <View style={styles.container}>
      {label && <Text style={styles.text}>{label}</Text>}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        autoComplete={type ? type : 'off'}
        placeholder={placeholder ? placeholder : undefined}
        secureTextEntry={type === 'password' ? true : false}
        maxLength={30}
        keyboardType={type === 'email' ? 'email-address' : 'default'}
        style={[styles.textInput, borderColor]}
      />

      <WarningText value={value} viewWarnings={viewWarnings} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  textInput: {
    borderBottomWidth: 1,
    fontSize: 15,
  },
});

export default CrudentialsTextInput;
