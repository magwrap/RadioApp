import React from 'react';
import {View} from 'react-native';
import {stationStyles} from '../../../styles/Radio/StationsStyles';
import StationFilter from './StationFilter';

interface ViewStationFiltersProps {
  stationFilter: string;
  setStationFilter: React.Dispatch<React.SetStateAction<string>>;
}

const filters1 = ['all', 'classical', 'country', 'dance', 'disco'];
// 'rap', - nie ma zadnej stacji
const filters2 = ['house', 'jazz', 'pop', 'retro', 'rock'];

const ViewStationFilters: React.FC<ViewStationFiltersProps> = ({
  stationFilter,
  setStationFilter,
}) => {
  return (
    <View style={[stationStyles.stationFilters]}>
      <View style={stationStyles.stationFilterColumn}>
        {filters1.map((filter, i) => (
          <StationFilter
            key={i}
            stationFilter={stationFilter}
            setStationFilter={setStationFilter}
            filter={filter}
          />
        ))}
      </View>
      <View style={stationStyles.stationFilterColumn}>
        {filters2.map((filter, i) => (
          <StationFilter
            key={i}
            stationFilter={stationFilter}
            setStationFilter={setStationFilter}
            filter={filter}
          />
        ))}
      </View>
    </View>
  );
};

export default ViewStationFilters;
