import {StyleSheet} from 'react-native';

export const stationStyles = StyleSheet.create({
  stationFilters: {
    flexDirection: 'row',
  },
  stationFilterColumn: {
    width: '50%',
  },
  selectedStationFilter: {
    backgroundColor: 'tomato',
  },
  normalStationFilter: {
    backgroundColor: '#b2b2b2',
  },
  stationFilter: {
    borderWidth: 1,
    borderRadius: 5,
    margin: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  filterText: {
    fontSize: 17,
  },

  station: {
    maxWidth: '100%',
  },
  stationLeft: {
    flexDirection: 'row',
  },
  stationContent: {
    padding: 10,
    maxWidth: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stationTexts: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 10,
  },
  stationName: {
    fontSize: 16,
    textAlign: 'left',
  },
  stationInfo: {
    fontSize: 10,
    textAlign: 'left',
  },
  tickerWidth: {
    width: 250,
    maxWidth: '95%',
  },
});
