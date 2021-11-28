import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {stationStyles} from '../../../styles/Radio/StationsStyles';

interface StationFilterProps {
  stationFilter: string;
  setStationFilter: React.Dispatch<React.SetStateAction<string>>;
  filter: string;
}

const StationFilter: React.FC<StationFilterProps> = ({
  stationFilter,
  setStationFilter,
  filter,
}) => {
  return (
    <TouchableOpacity
      onPress={() => setStationFilter(filter)}
      style={[
        stationFilter === filter
          ? stationStyles.selectedStationFilter
          : stationStyles.normalStationFilter,
        stationStyles.stationFilter,
      ]}>
      <Text style={stationStyles.filterText}>{filter}</Text>
    </TouchableOpacity>
  );
};

export default StationFilter;
