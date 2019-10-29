import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Rating } from 'react-native-ratings';
import firebase from 'react-native-firebase';
import { theme } from '../theme';

class BeriUlasanScreen extends React.Component {
  static navigationOptions = {
    title: 'Nilai MUA Pilihanmu',
  };

  constructor(props) {
    super(props);
    this.state = {
      mua: props.navigation.getParam('mua'),
      ulasan: '',
      rating: 0,
    };
  }

  handleFinishRating = rating => {
    this.setState({ rating });
  };

  handleChangeUlasan = val => {
    this.setState({ ulasan: val });
  };

  handleUlas = async () => {
    const { ulasan, rating, mua } = this.state;
    const { navigation } = this.props;

    const authUser = firebase.auth().currentUser;
    const getUser = await firebase
      .firestore()
      .collection('users')
      .doc(authUser.uid)
      .get();
    const currUser = getUser.data();
    await firebase
      .firestore()
      .collection('ulasan')
      .add({
        rating,
        ulasan,
        namaPengulas: currUser.namaLengkap,
        idPengulas: currUser.uid,
        avatarPengulas: currUser.avatar || null,
        idMua: mua.uid,
      });
    navigation.goBack();
  };

  render() {
    const { ulasan } = this.state;

    return (
      <ScrollView>
        <View style={styles.root}>
          <Text style={{ fontSize: 16, textAlign: 'center' }}>
            Beri nilai untuk MUA dan Makeup kamu
          </Text>
          <Rating
            imageSize={32}
            startingValue={0}
            ratingCount={5}
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              paddingVertical: 12,
              justifyContent: 'center',
            }}
            onFinishRating={this.handleFinishRating}
          />
          <TextInput
            multiline
            placeholder="Tulis komentar kamu untuk MUA dan hasil makeup-nya"
            style={styles.input}
            textAlignVertical="top"
            numberOfLines={5}
            value={ulasan}
            onChangeText={this.handleChangeUlasan}
          />
          <TouchableOpacity onPress={this.handleUlas}>
            <View style={styles.btn}>
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
                Kirim
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    paddingHorizontal: 16,
  },
  btn: {
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    padding: 16,
    borderRadius: 4,
    marginTop: 32,
  },
});

export default BeriUlasanScreen;
