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
import Swiper from 'react-native-swiper-flatlist';
import Logo from '../components/navbar/logo.component';
import { theme } from '../theme';

import image1 from '../assets/account-circle.png';
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

  state = {
    user: null,
  };

  async componentDidMount() {
    const loggedUser = firebase.auth().currentUser;
    const user = await firebase
      .firestore()
      .collection('users')
      .doc(loggedUser.uid)
      .get();
    this.setState({ user: user.data() });
  }

  render() {
    const { user } = this.state;

    return (
      <React.Fragment>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" />
        <ScrollView>
          <View style={styles.accountWrapper}>
            <Image
              source={user && user.avatar ? { uri: user.avatar } : image1}
              resizeMode="cover"
              style={styles.accountImage}
            />
            <Text style={styles.accountName}>
              {user && (user.namaLengkap || user.email || null)}
            </Text>
          </View>

          <View style={styles.wrapper}>
            <View style={styles.jadwalWrapper}>
              <Text style={styles.jadwalTitle}>Jadwal Kamu Hari Ini</Text>
              <View style={styles.listItem}>
                <Text style={styles.listItemTime}>09.00</Text>
                <Text style={styles.listItemText}>Judul makeup disini</Text>
              </View>
              <View style={styles.listItem}>
                <Text style={styles.listItemTime}>10.00</Text>
                <Text style={styles.listItemText}>
                  lorem ipsum dolor sit amet dolor ipsum dolor site admf ladj
                  flaksdj flakdj flkaj
                </Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Gallery')}
            >
              <View style={styles.btnPortfolio}>
                <Text style={styles.btnPortfolioText}>
                  Upload Portofolio Kamu
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </React.Fragment>
    );
  }
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  accountWrapper: {
    width,
    height: 150,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  accountImage: {
    width: 80,
    height: 80,
    borderRadius: 80,
    borderColor: '#fff',
    borderWidth: 2,
  },
  accountName: {
    color: '#fff',
    fontSize: 16,
    marginTop: 8,
    fontWeight: 'bold',
  },
  wrapper: {
    padding: 16,
  },
  jadwalWrapper: {
    backgroundColor: '#eee',
    padding: 16,
    borderRadius: 3,
  },
  jadwalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  listItem: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  listItemTime: {
    width: 60,
    fontSize: 16,
  },
  listItemText: {
    flex: 1,
    fontSize: 16,
  },
  btnPortfolio: {
    backgroundColor: theme.colors.primary,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  btnPortfolioText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
