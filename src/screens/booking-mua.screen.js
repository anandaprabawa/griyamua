import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import firebase from 'react-native-firebase';
import { format } from 'date-fns';
import { statusBooking } from './detail-booking.screen';

class BookingScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Pemesanan',
  };

  state = {
    data: [],
  };

  componentDidMount() {
    const { currentUser } = firebase.auth();
    firebase
      .firestore()
      .collection('pesanan')
      .where('muaId', '==', currentUser.uid)
      .onSnapshot(snapshot => {
        const temp = [];
        snapshot.forEach(snap => {
          temp.push({ ...snap.data(), id: snap.id });
        });
        const sortedTemp = temp.sort((a, b) => {
          return (
            new Date(a.tanggalPesanan.toDate()) -
            new Date(b.tanggalPesanan.toDate())
          );
        });
        this.setState({ data: sortedTemp });
      });
  }

  formatDate = date => {
    return format(date.toDate(), 'dd MMMM yyyy - HH:mm');
  };

  handlePress = val => () => {
    const { navigation } = this.props;
    navigation.push('DetailBookingMua', { data: val, fromBooking: true });
  };

  render() {
    const { data } = this.state;

    return (
      <ScrollView>
        {data.length > 0 &&
          data.map(item => (
            <TouchableWithoutFeedback
              onPress={this.handlePress(item)}
              key={`pesanan-${item.id}`}
            >
              <View style={styles.cardRoot}>
                <Text style={{ fontWeight: 'bold' }}>{item.nama}</Text>
                <Text>{this.formatDate(item.tanggalPesanan)}</Text>
                <Text>{item.alamatLengkap}</Text>
                <Text style={styles.status(item.status)}>
                  STATUS:
                  {'  '}
                  {statusBooking[item.status]}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  cardRoot: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  status: c => ({
    color:
      (c === 0 && 'red') ||
      (c === 1 && 'orange') ||
      (c === 2 && 'green') ||
      (c === 3 && 'red'),
    borderWidth: 1,
    borderColor:
      (c === 0 && 'red') ||
      (c === 1 && 'orange') ||
      (c === 2 && 'green') ||
      (c === 3 && 'red'),
    borderRadius: 8,
    paddingHorizontal: 8,
    marginTop: 4,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  }),
});

export default BookingScreen;
