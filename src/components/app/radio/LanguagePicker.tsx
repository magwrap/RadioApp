import {Picker} from '@react-native-picker/picker';
import React from 'react';
import {View} from 'react-native';

const languages = ['polish', 'english'];

interface LanguagePickerProps {
  selectedLanguage: string;
  setSelectedLanguage: React.Dispatch<React.SetStateAction<string>>;
}

const LanguagePicker: React.FC<LanguagePickerProps> = ({
  selectedLanguage,
  setSelectedLanguage,
}) => {
  return (
    <View>
      <Picker
        selectedValue={selectedLanguage}
        onValueChange={itemValue => setSelectedLanguage(itemValue)}>
        {languages.map(language => (
          <Picker.Item
            key={language}
            label={language[0].toUpperCase() + language.substring(1)}
            value={language}
          />
        ))}
      </Picker>
    </View>
  );
};

export default LanguagePicker;
