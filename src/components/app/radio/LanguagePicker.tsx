import {Picker} from '@react-native-picker/picker';
import React from 'react';
import {View} from 'react-native';
import {useRadioStateContext} from '../../../hooks/RadioStateProvider';

const languages = ['polish', 'english'];

interface LanguagePickerProps {}

const LanguagePicker: React.FC<LanguagePickerProps> = ({}) => {
  const pickerWidth = {minWidth: '45%', maxWidth: '50%'};
  const {selectedLanguage, changeLanguage} = useRadioStateContext();
  return (
    <View style={pickerWidth}>
      <Picker
        selectedValue={selectedLanguage}
        onValueChange={itemValue => changeLanguage(itemValue)}>
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
