import {RadioBrowserApi, Station} from 'radio-browser-api';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import LanguagePicker from '../../components/app/radio/LanguagePicker';
import RenderStation from '../../components/app/radio/RenderStation';
import ViewStationFilters from '../../components/app/radio/ViewStationFilters';

interface RadioScreenProps {}

const RadioScreen: React.FC<RadioScreenProps> = ({}) => {
  const [stations, setStations] = useState<Station[]>();
  const [stationFilter, setStationFilter] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('polish');

  useEffect(() => {
    setupApi(stationFilter).then(data => {
      if (data) {
        setStations(data);
      }
    });
  }, [stationFilter, selectedLanguage]);

  const setupApi = async (stationFiltr: string) => {
    const api = new RadioBrowserApi('My Radio App');

    // eslint-disable-next-line no-shadow
    const stations = await api.searchStations({
      language: selectedLanguage,
      tag: stationFiltr,
      limit: 50,
      order: 'clickCount', //clickTrend
    });

    return stations;
  };

  const renderItem = ({item}: {item: Station}) => {
    return <RenderStation station={item} />;
  };

  return (
    <View style={styles.container}>
      <ViewStationFilters
        stationFilter={stationFilter}
        setStationFilter={setStationFilter}
      />

      <LanguagePicker
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
      />

      {stations ? (
        <FlatList
          data={stations}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListFooterComponent={<View style={styles.footer} />}
        />
      ) : (
        <View style={styles.activityIndicator}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1},
  activityIndicator: {alignItems: 'center', justifyContent: 'center'},
  footer: {height: 60},
});

export default RadioScreen;
