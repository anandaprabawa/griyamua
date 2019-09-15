import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { theme } from '../theme';
import firebase from 'react-native-firebase';

class BeriUlasanScreen extends React.Component {
  static navigationOptions = {
    title: 'Ulas',
  };

  state = {
    ulasan: '',
  };

  handleChangeUlasan = val => {
    this.setState({ ulasan: val });
  };

  handleUlas = async () => {
    const selectedUser = this.props.navigation.getParam('user');
    const authUser = firebase.auth().currentUser;
    const getUser = await firebase
      .firestore()
      .collection('users')
      .doc(authUser.uid)
      .get();
    const currUser = getUser.data();
    await firebase
      .firestore()
      .collection('users')
      .doc(selectedUser.uid)
      .collection('ulasan')
      .add({ ulasan: this.state.ulasan, namaPengulas: currUser.name });
    this.props.navigation.goBack();
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.root}>
          <TextInput
            multiline
            placeholder="Ulasan..."
            style={styles.input}
            textAlignVertical="top"
            numberOfLines={5}
            onChangeText={this.handleChangeUlasan}
          />
          <TouchableOpacity onPress={this.handleUlas}>
            <View style={styles.btn}>
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
                Simpan
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
