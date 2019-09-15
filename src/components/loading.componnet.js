import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

function Loading() {
  return (
    <View style={styles.root}>
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
}
const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loading;
