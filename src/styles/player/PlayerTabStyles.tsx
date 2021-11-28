import {StyleSheet} from 'react-native';

export const playerStyles = StyleSheet.create({
  tickerWidth: {
    maxWidth: '67%',
  },
  stationName: {},
  container: {
    height: 60,
    width: '100%',
    borderTopWidth: 1,
    position: 'absolute',
    bottom: 50,
    // top: 100,
    flexDirection: 'row',
    backgroundColor: '#FDFDFD',
    padding: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  buttons: {
    flexDirection: 'row',
  },
  button: {
    margin: 2,
    marginRight: 10,
  },
  progressBar: {
    flexDirection: 'row',
    marginVertical: 1,
    marginHorizontal: 1,
    borderColor: 'white',
    borderWidth: 1,
    width: 165,
  },
  progressBarText: {
    alignSelf: 'center',
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 100,
    marginRight: 5,
  },
  station: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 120,
  },
});
