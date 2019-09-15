import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Rating } from 'react-native-ratings';
import image from '../assets/graduation.jpeg';

const MuaCard = () => (
  <View style={styles.muaCardRoot}>
    <Image source={image} style={styles.muaCardImage} resizeMode="cover" />
    <View>
      <Text style={styles.muaCardName}>Ida Ayu Ratih</Text>
      <Text style={styles.muaCardLocation}>Bali</Text>
      <Rating
        startingValue={5}
        count={5}
        imageSize={16}
        readonly
        isDisabled
        style={{ display: 'flex', alignItems: 'flex-start' }}
      />
    </View>
  </View>
);

const TopMUA = () => (
  <View style={styles.root}>
    <Text style={styles.title}>Top 10 Makeup Artist</Text>
    <View>
      <MuaCard />
      <MuaCard />
      <MuaCard />
      <MuaCard />
      <MuaCard />
      <MuaCard />
      <MuaCard />
      <MuaCard />
      <MuaCard />
      <MuaCard />
    </View>
  </View>
);

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  muaCardRoot: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  muaCardImage: {
    width: 80,
    height: 80,
    borderRadius: 60,
    marginRight: 16,
  },
  muaCardName: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 8,
    marginBottom: 4,
  },
  muaCardLocation: {
    marginBottom: 8,
    fontSize: 18,
  },
});

export default TopMUA;
