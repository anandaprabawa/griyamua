import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from 'react-native-firebase';
import { theme } from '../theme';

const Card = ({ mua, item, navigation }) => (
  <View style={styles.cardRoot}>
    <View style={styles.cardLeft}>
      <Text style={styles.cardTitle}>{item.nama}</Text>
      <Text style={styles.cardDesc}>{item.layanan}</Text>
      <View style={styles.cardDetail}>
        <Icon name="clock-outline" size={20} style={styles.cardIcon} />
        <Text style={[styles.cardText, styles.cardHour]}>
          {`${item.lamaPengerjaan} Menit`}
        </Text>
      </View>
      <View style={styles.cardDetail}>
        <Icon
          name="cash"
          size={20}
          style={styles.cardIcon}
          color={theme.colors.primary}
        />
        <Text style={[styles.cardPrice, styles.cardText]}>
          {`Rp ${item.harga}`}
        </Text>
      </View>
    </View>
    <View>
      <TouchableOpacity onPress={() => navigation.push('Pesan', { mua, item })}>
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

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      user: props.navigation.getParam('mua'),
    };
  }

  componentDidMount() {
    const { user } = this.state;
    firebase
      .firestore()
      .collection('daftar-harga')
      .where('ownerId', '==', user.uid)
      .onSnapshot(snapshot => {
        const tempData = [];
        snapshot.forEach(snap => {
          tempData.push(snap.data());
        });
        this.setState({ data: tempData });
      });
  }

  keyExtractor = (item, index) => `pricelist-${index}`;

  navigateToCreate = () => {
    const { navigation } = this.props;
    navigation.push('CreatePricelist');
  };

  render() {
    const { data, user } = this.state;
    const { navigation } = this.props;

    return (
      <View style={{ position: 'relative', height: '100%' }}>
        <FlatList
          data={data}
          keyExtractor={this.keyExtractor}
          renderItem={({ item }) => (
            <Card mua={user} item={item} navigation={navigation} />
          )}
          contentContainerStyle={styles.scroll}
        />
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
