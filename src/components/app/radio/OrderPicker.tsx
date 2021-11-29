import {Picker} from '@react-native-picker/picker';
import React from 'react';
import {View} from 'react-native';
import {useRadioStateContext} from '../../../hooks/RadioStateProvider';

const orders = [
  'votes',
  'name',
  'bitrate',
  'lastCheckTime',
  'lastCheckOK',
  'clickTimeStamp',
  'clickCount',
  'clickTrend',
  'country',
  'state',
  'language',
  'random',
];

interface OrderPickerProps {}

const OrderPicker: React.FC<OrderPickerProps> = ({}) => {
  const {order, changeOrder} = useRadioStateContext();
  const pickerWidth = {minWidth: '50%', maxWidth: '55%'};
  return (
    <View style={pickerWidth}>
      <Picker
        selectedValue={order}
        onValueChange={itemValue => changeOrder(itemValue)}>
        {orders.map(ord => (
          <Picker.Item
            key={ord}
            label={ord[0].toUpperCase() + ord.substring(1)}
            value={ord}
          />
        ))}
      </Picker>
    </View>
  );
};

export default OrderPicker;
