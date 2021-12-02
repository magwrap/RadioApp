import React, {createContext, useContext, useState} from 'react';

interface RadioStateProviderProps {
  children: React.ReactNode;
}

export type Order =
  | 'name'
  | 'url'
  | 'homepage'
  | 'favicon'
  | 'tags'
  | 'country'
  | 'state'
  | 'language'
  | 'votes'
  | 'codec'
  | 'bitrate'
  | 'lastCheckOK'
  | 'lastCheckTime'
  | 'clickTimeStamp'
  | 'clickCount'
  | 'clickTrend'
  | 'random'
  | undefined;

const RadioStateContext = createContext<{
  selectedLanguage: string;
  changeLanguage: (language: string) => void;
  order: Order;
  changeOrder: (order: Order) => void;
}>({
  selectedLanguage: 'polish',
  changeLanguage: () => {},
  order: 'name',
  changeOrder: () => {},
});

export const useRadioStateContext = () => useContext(RadioStateContext);

const RadioStateProvider: React.FC<RadioStateProviderProps> = ({children}) => {
  const [selectedLanguage, setSelectedLanguage] = useState('polish');
  const [order, setOrder] = useState<Order>('name');

  const changeLanguage = (language: string) => {
    setSelectedLanguage(language);
  };

  // eslint-disable-next-line no-shadow
  const changeOrder = (order: Order) => {
    setOrder(order);
  };
  return (
    <RadioStateContext.Provider
      value={{selectedLanguage, changeLanguage, order, changeOrder}}>
      {children}
    </RadioStateContext.Provider>
  );
};

export default RadioStateProvider;
