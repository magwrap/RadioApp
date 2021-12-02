import useFirebaseRealtimeDB from '../../hooks/useFirebaseRealtimeDB';
import React from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import RenderSong from '../../components/app/music/RenderSong';
import {Song} from '../../hooks/PlayerProvider';
import Center from '../../components/app/Center';

interface MusicScreenProps {}

const MusicScreen: React.FC<MusicScreenProps> = ({}) => {
  const {songs} = useFirebaseRealtimeDB();

  const renderItem = ({item}: {item: Song}) => {
    return <RenderSong song={item} />;
  };

  return (
    <View style={styles.container}>
      {songs ? (
        <FlatList
          data={songs}
          renderItem={renderItem}
          keyExtractor={(item, index) => String(index)}
          ListFooterComponent={<View style={styles.footer} />}
        />
      ) : (
        <Center>
          <ActivityIndicator size="large" />
        </Center>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  activityIndicator: {alignItems: 'center', justifyContent: 'center'},
  footer: {height: 60},
});

export default MusicScreen;
