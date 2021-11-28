import React, {Dispatch, SetStateAction, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {WarningText} from './WarningText';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

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
  const [showPassword, toggleShowPassword] = useState(false);
  const borderColor = {borderColor: value || !viewWarnings ? 'black' : 'red'};

  const onPressShowPassword = () => {
    toggleShowPassword(!showPassword);
  };
  return (
    <View style={styles.container}>
      {label && <Text style={styles.text}>{label}</Text>}
      <View style={[styles.textInputBox, borderColor]}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          autoComplete={type ? type : 'off'}
          placeholder={placeholder ? placeholder : undefined}
          secureTextEntry={type === 'password' ? !showPassword : false}
          maxLength={30}
          style={styles.textInput}
          keyboardType={type === 'email' ? 'email-address' : 'default'}
        />
        {type === 'password' ? (
          <TouchableOpacity
            style={styles.showPasswordIcon}
            onPress={onPressShowPassword}>
            {!showPassword ? (
              <FontAwesome5Icon name="eye-slash" color="black" size={20} />
            ) : (
              <FontAwesome5Icon name="eye" color="black" size={20} />
            )}
          </TouchableOpacity>
        ) : null}
      </View>

      <WarningText value={value} viewWarnings={viewWarnings} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingBottom: 2,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  textInputBox: {
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInput: {
    fontSize: 17,
  },
  showPasswordIcon: {
    marginRight: 10,
  },
});

export default CrudentialsTextInput;
