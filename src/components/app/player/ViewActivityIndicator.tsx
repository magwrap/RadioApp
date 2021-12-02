import React from 'react';
import {View, ActivityIndicator, StyleSheet, Text} from 'react-native';
import Center from '../Center';

interface ViewActivityIndicatorProps {
  player: any;
  size?: number | 'small' | 'large' | undefined;
  viewText?: boolean;
}

const ViewActivityIndicator: React.FC<ViewActivityIndicatorProps> = ({
  player,
  size = 'small',
  viewText = false,
}) => {
  const viewIndicator = !player.isLoaded();
  return (
    <View style={styles.indicator}>
      <ActivityIndicator size={size} animating={viewIndicator} />
      {viewIndicator && viewText && (
        <Center>
          <Text>Connecting...</Text>
        </Center>
      )}
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
