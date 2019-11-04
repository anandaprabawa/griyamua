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
import AsyncStorage from '@react-native-community/async-storage';
import Logo from '../components/navbar/logo.component';
import { theme } from '../theme';

import image1 from '../assets/account-circle.png';
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
    const { currentUser } = firebase.auth();
    const user = await firebase
      .firestore()
      .collection('users')
      .doc(currentUser.uid)
      .get();
    this.setState({ user: user.data() });

    if (!user.data().playerId) {
      const playerId = await AsyncStorage.getItem('@playerId');
      await firebase
        .firestore()
        .collection('users')
        .doc(currentUser.uid)
        .update({ playerId });
    }
  }

  handleGetMua = async category => {
    const mua = [];
    const getMua = await firebase
      .firestore()
      .collection('users')
      .where('isMua', '==', true)
      .where('jenisMakeup', 'array-contains', category)
      .get();
    getMua.forEach(snapshot => {
      const data = snapshot.data();
      if (data.uid !== firebase.auth().currentUser.uid) {
        mua.push(snapshot.data());
      }
    });
    return mua;
  };

  handleGetDaftarHarga = async () => {
    const listHarga = [];
    const df = await firebase
      .firestore()
      .collection('daftar-harga')
      .get();
    df.forEach(snapshot => {
      listHarga.push(snapshot.data());
    });
    return listHarga;
  };

  filterMua = allData => {
    const [mua, df] = allData;

    return new Promise(resolve => {
      const filterHasDF = m => {
        const hasDF = df.filter(val => val.ownerId === m.uid);
        return hasDF.length > 0;
      };

      const newMua = mua.filter(m => filterHasDF(m));

      resolve(newMua);
    });
  };

  handleSearch = category => async () => {
    const { navigation } = this.props;
    const allData = await Promise.all([
      this.handleGetMua(category),
      this.handleGetDaftarHarga(),
    ]);
    const filteredMua = await this.filterMua(allData);
    navigation.push('SearchResult', { mua: filteredMua });
  };

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

          <View style={styles.categoryWrapper}>
            <View style={styles.category}>
              <TouchableOpacity onPress={this.handleSearch('Beauty Class')}>
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
              <TouchableOpacity
                onPress={this.handleSearch('Pre-wedding/Wedding')}
              >
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
              <TouchableOpacity onPress={this.handleSearch('Graduation')}>
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
              <TouchableOpacity onPress={this.handleSearch('Traditional')}>
                <Image
                  source={payasAgung}
                  resizeMode="cover"
                  style={styles.categoryImage}
                />
                <View style={styles.categoryOverlay} />
                <View style={styles.categoryTextWrapper}>
                  <Text style={styles.categoryText}>Traditional Makeup</Text>
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
    paddingTop: 16,
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
