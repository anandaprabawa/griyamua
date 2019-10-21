import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import firebase from 'react-native-firebase';
import { theme } from '../theme';

const Card = ({ navigation }) => (
  <View style={styles.cardRoot}>
    <View style={styles.cardLeft}>
      <Text style={styles.cardTitle}>Makeup Luar Biasa</Text>
      <Text style={styles.cardDesc}>Deskripsi makeup</Text>
      <View style={styles.cardDetail}>
        <Icon name="clock-outline" size={20} style={styles.cardIcon} />
        <Text style={[styles.cardText, styles.cardHour]}>5 Menit</Text>
      </View>
      <View style={styles.cardDetail}>
        <Icon
          name="cash"
          size={20}
          style={styles.cardIcon}
          color={theme.colors.primary}
        />
        <Text style={[styles.cardPrice, styles.cardText]}>Rp 400.000</Text>
      </View>
    </View>
    <View>
      <TouchableOpacity onPress={() => navigation.push('Pesan')}>
        <View style={styles.buttonWrapper}>
          <Text style={styles.buttonText}>Pesan</Text>
        </View>
      </TouchableOpacity>
    </View>
  </View>
);

class PricelistScreen extends React.Component {
  static navigationOptions = {
    title: 'Daftar Harga',
  };

  // state = {
  //   data: [],
  //   isMe: false,
  //   user: null,
  // };

  // componentDidMount() {
  //   const loginUser = firebase.auth().currentUser;
  //   // if (user.uid) {
  //   //   firebase
  //   //     .firestore()
  //   //     .collection('users')
  //   //     .doc(user.uid)
  //   //     .get()
  //   //     .then(doc => {
  //   //       this.setState({ user: doc.data() });
  //   //     });
  //   // }
  //   firebase
  //     .firestore()
  //     .collection('users')
  //     .doc(user ? user.uid : loginUser.uid)
  //     .collection('daftar-harga')
  //     .onSnapshot(snapshot => {
  //       const tempData = [];
  //       snapshot.forEach(snap => {
  //         tempData.push(snap.data());
  //       });
  //       this.setState({ data: tempData });
  //     });
  //   if ((user && user.uid === loginUser.uid) || !user) {
  //     this.setState({ isMe: true });
  //   } else {
  //     this.setState({ isMe: false, user });
  //   }
  // }

  // keyExtractor = (item, index) => `pricelist-${index}`;

  navigateToCreate = () => {
    const { navigation } = this.props;
    navigation.push('CreatePricelist');
  };

  render() {
    return (
      <View style={{ position: 'relative', height: '100%' }}>
        {/* <FlatList
          data={this.state.data}
          keyExtractor={this.keyExtractor}
          renderItem={Card(this.state, this.props.navigation)}
          contentContainerStyle={styles.scroll}
        />
        {this.state.isMe && ( */}
        <Card navigation={this.props.navigation} />
        <Card navigation={this.props.navigation} />
        <Card navigation={this.props.navigation} />
        <TouchableOpacity
          style={styles.addButton}
          onPress={this.navigateToCreate}
        >
          {/* <Icon
            name="plus"
            size={24}
            color="#fff"
            style={{
              position: 'absolute',
              bottom: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          /> */}
          <Text style={styles.btnText}>Tambah Daftar Harga</Text>
        </TouchableOpacity>
        {/* )} */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardRoot: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardLeft: {
    flexGrow: 1,
  },
  cardTitle: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardDesc: {
    marginBottom: 8,
    fontSize: 15,
  },
  cardPrice: {
    color: theme.colors.primary,
  },
  cardText: {
    fontSize: 15,
  },
  cardDetail: {
    flexDirection: 'row',
    marginBottom: 2,
    alignItems: 'center',
  },
  cardIcon: {
    marginRight: 8,
  },
  buttonWrapper: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: theme.colors.primary,
  },
  addButton: {
    backgroundColor: theme.colors.primary,
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '100%',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    // borderRadius: 100,
    // elevation: 4,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
  },
  scroll: {
    paddingBottom: 88,
  },
});

export default PricelistScreen;
