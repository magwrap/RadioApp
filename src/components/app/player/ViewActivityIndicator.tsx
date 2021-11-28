import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

interface ViewActivityIndicatorProps {
  player: any;
  size?: number | 'small' | 'large' | undefined;
}

const ViewActivityIndicator: React.FC<ViewActivityIndicatorProps> = ({
  player,
  size = 'small',
}) => {
  const viewIndicator = !player.isLoaded();
  return (
    <View style={styles.indicator}>
      <ActivityIndicator size={size} animating={viewIndicator} />
    </View>
  );
};

const styles = StyleSheet.create({
  indicator: {
    margin: 2,
    alignSelf: 'center',
  },
});

export default ViewActivityIndicator;
