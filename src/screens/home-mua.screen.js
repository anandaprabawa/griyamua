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
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';
import { getMinutes, getHours, format } from 'date-fns';
import Logo from '../components/navbar/logo.component';
import { theme } from '../theme';
import image1 from '../assets/account-circle.png';

class HomeScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <Logo />,
  };

  state = {
    user: null,
    jadwal: null,
  };

  async componentDidMount() {
    this.fetchUser();
    this.fetchJadwal();
  }

  fetchUser = async () => {
    const loggedUser = firebase.auth().currentUser;
    const user = await firebase
      .firestore()
      .collection('users')
      .doc(loggedUser.uid)
      .get();
    this.setState({ user: user.data() });

    if (!user.data().playerId) {
      const playerId = await AsyncStorage.getItem('@playerId');
      await firebase
        .firestore()
        .collection('users')
        .doc(loggedUser.uid)
        .update({ playerId });
    }
  };

  fetchJadwal = () => {
    const loggedUser = firebase.auth().currentUser;
    firebase
      .firestore()
      .collection('pesanan')
      .where('muaId', '==', loggedUser.uid)
      .onSnapshot(snapshot => {
        const docs = [];
        snapshot.forEach(doc => {
          const d = { ...doc.data(), id: doc.id };
          const time = `${getHours(d.tanggalPesanan.toDate())}:${getMinutes(
            d.tanggalPesanan.toDate(),
          )}`;
          d.time = time;

          if (
            format(d.tanggalPesanan.toDate(), 'yyyy-MM-dd') ===
              format(new Date(), 'yyyy-MM-dd') &&
            d.status === 2
          ) {
            docs.push(d);
          }
        });

        const sortByTime = docs.sort((a, b) => {
          return a.tanggalPesanan.toDate() > b.tanggalPesanan.toDate() ? 1 : -1;
        });
        this.setState({ jadwal: sortByTime });
      });
  };

  render() {
    const { user, jadwal } = this.state;
    const { navigation } = this.props;

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
              {jadwal &&
                jadwal.map(j => (
                  <View key={j.time} style={styles.listItem}>
                    <Text style={styles.listItemTime}>{j.time}</Text>
                    <Text style={styles.listItemText}>{j.nama}</Text>
                  </View>
                ))}
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('Gallery')}>
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
