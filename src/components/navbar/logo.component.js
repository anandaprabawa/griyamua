import React from 'react';
import { StyleSheet, Image } from 'react-native';
import griyamuaImage from '../../assets/griyamua-landscape.png';

const Logo = () => (
  <Image source={griyamuaImage} resizeMode="contain" style={styles.image} />
);

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
  },
  image: {
    maxWidth: '100%',
    maxHeight: 40,
  },
});

export default Logo;
