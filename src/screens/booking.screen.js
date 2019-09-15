import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import firebase from 'react-native-firebase';

class BookingScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Pemesanan',
  };

  state = {
    data: [],
  };

  componentDidMount() {
    const user = this.props.navigation.getParam('user');
    const loginUser = firebase.auth().currentUser;

    if (user && user.uid === loginUser.uid) {
      firebase
        .firestore()
        .collection('pesanan')
        .where('mua.uid', '==', loginUser.uid)
        .onSnapshot(snapshot => {
          const temp = [];
          snapshot.forEach(snap => {
            temp.push(snap.data());
          });
          this.setState({ data: temp });
        });
    } else {
      firebase
        .firestore()
        .collection('pesanan')
        .where('pemesan.uid', '==', loginUser.uid)
        .onSnapshot(snapshot => {
          const temp = [];
          snapshot.forEach(snap => {
            temp.push(snap.data());
          });
          this.setState({ data: temp });
        });
    }
  }

  handlePress = val => () => {
    const { navigation } = this.props;
    navigation.push('DetailBooking', { pesanan: val });
  };

  render() {
    return (
      <ScrollView>
        {this.state.data.map((v, i) => (
          <TouchableWithoutFeedback
            onPress={this.handlePress(v)}
            key={`pesanan-${i}`}
          >
            <View style={styles.cardRoot}>
              <Text>{v.item.nama}</Text>
              <Text>
                {v.tanggal} - {v.jam}
              </Text>
              <Text>{v.alamat}</Text>
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
});

export default BookingScreen;
