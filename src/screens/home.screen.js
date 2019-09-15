import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Dimensions,
} from 'react-native';
import firebase from 'react-native-firebase';
import { GoogleSignin } from 'react-native-google-signin';
import Swiper from 'react-native-swiper-flatlist';
import Logo from '../components/navbar/logo.component';

import image1 from '../assets/swiper/slider-1.png';
import image2 from '../assets/swiper/slider-2.jpg';
import image3 from '../assets/swiper/slider-3.jpg';
import beautyClassImage from '../assets/beauty-class.jpeg';
import graduationImage from '../assets/graduation.jpeg';
import payasAgung from '../assets/payas-agung.jpeg';
import weddingImage from '../assets/wedding.jpeg';
import TopMUA from '../components/top-mua.component';

class HomeScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <Logo />,
  };

  render() {
    return (
      <React.Fragment>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" />
        <ScrollView>
          <View style={styles.swiper}>
            <Swiper autoplay autoplayDelay={3} autoplayLoop showPagination>
              <View style={styles.imageSwiperWrapper}>
                <Image
                  source={image1}
                  resizeMode="cover"
                  style={styles.imageSwiper}
                />
              </View>
              <View style={styles.imageSwiperWrapper}>
                <Image
                  source={image2}
                  resizeMode="cover"
                  style={styles.imageSwiper}
                />
              </View>
              <View style={styles.imageSwiperWrapper}>
                <Image
                  source={image3}
                  resizeMode="cover"
                  style={styles.imageSwiper}
                />
              </View>
            </Swiper>
          </View>

          <View style={styles.categoryWrapper}>
            <View style={styles.category}>
              <TouchableOpacity>
                <Image
                  source={beautyClassImage}
                  resizeMode="cover"
                  style={styles.categoryImage}
                />
                <View style={styles.categoryOverlay} />
                <View style={styles.categoryTextWrapper}>
                  <Text style={styles.categoryText}>Beauty Class</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.category}>
              <TouchableOpacity>
                <Image
                  source={weddingImage}
                  resizeMode="cover"
                  style={styles.categoryImage}
                />
                <View style={styles.categoryOverlay} />
                <View style={styles.categoryTextWrapper}>
                  <Text style={styles.categoryText}>Prewedding/Wedding</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.category}>
              <TouchableOpacity>
                <Image
                  source={graduationImage}
                  resizeMode="cover"
                  style={styles.categoryImage}
                />
                <View style={styles.categoryOverlay} />
                <View style={styles.categoryTextWrapper}>
                  <Text style={styles.categoryText}>Graduation</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.category}>
              <TouchableOpacity>
                <Image
                  source={payasAgung}
                  resizeMode="cover"
                  style={styles.categoryImage}
                />
                <View style={styles.categoryOverlay} />
                <View style={styles.categoryTextWrapper}>
                  <Text style={styles.categoryText}>Payas Agung</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <TopMUA />
        </ScrollView>
      </React.Fragment>
    );
  }
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  swiper: {
    width,
    height: width / 2,
  },
  imageSwiper: {
    width,
    height: width / 2,
  },
  categoryWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 8,
    paddingVertical: 24,
  },
  category: {
    width: width / 2 - 24,
    height: width / 2 - 24,
    margin: 8,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  categoryOverlay: {
    backgroundColor: 'black',
    opacity: 0.5,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  categoryTextWrapper: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  categoryText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 24,
    textAlign: 'center',
  },
});

export default HomeScreen;
