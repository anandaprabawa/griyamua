import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import MultiSelect from 'react-native-sectioned-multi-select';
import firebase from 'react-native-firebase';
import { theme } from '../theme';
import { drugStoreProduct, highEndProduct } from './search.screen';

const jenisMakeup = [
  {
    name: 'Graduation',
  },
  {
    name: 'Payas Agung',
  },
  {
    name: 'Natural',
  },
  {
    name: 'Flawless',
  },
  {
    name: 'Korean',
  },
];

const jenisProduk = () => {
  const drugStore = [];
  const highEnd = [];
  drugStoreProduct.forEach(item => {
    drugStore.push({ name: item });
  });
  highEndProduct.forEach(item => {
    highEnd.push({ name: item });
  });
  return [...drugStore, ...highEnd];
};

class EditProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Edit Profil',
  };

  state = {
    user: {
      uid: null,
      name: null,
      username: null,
      jenisMakeup: [],
      jenisProduk: [],
      deskripsi: null,
      alamat: null,
      wa: null,
      ig: null,
      isMua: false,
    },
  };

  componentDidMount() {
    const { navigation } = this.props;
    const user = navigation.getParam('user');
    this.setState({ user });
  }

  handleSave = async () => {
    const { navigation } = this.props;

    await firebase
      .firestore()
      .collection('users')
      .doc(this.state.user.uid)
      .set(this.state.user);

    navigation.goBack();
  };

  handleJenisMakeup = selectedItems => {
    this.setState({ user: { ...this.state.user, jenisMakeup: selectedItems } });
  };

  handleJenisProduk = selectedItems => {
    this.setState({ user: { ...this.state.user, jenisProduk: selectedItems } });
  };

  handleInput = (name, value) => {
    this.setState({
      user: { ...this.state.user, [name]: value },
    });
  };

  render() {
    const { user } = this.state;

    return (
      <ScrollView>
        <View style={styles.root}>
          <View style={styles.fieldWrapper}>
            <Text>Nama</Text>
            <TextInput
              style={styles.field}
              value={user.name}
              onChangeText={val => this.handleInput('name', val)}
            />
          </View>
          <View style={styles.fieldWrapper}>
            <Text>Username</Text>
            <TextInput
              style={styles.field}
              value={user.username}
              onChangeText={val => this.handleInput('username', val)}
            />
          </View>
          {user.isMua && (
            <View style={styles.fieldWrapper}>
              <Text>Jenis Makeup</Text>
              <View style={[styles.field, { paddingHorizontal: 4 }]}>
                <MultiSelect
                  items={jenisMakeup}
                  uniqueKey="name"
                  selectedItems={this.state.user.jenisMakeup}
                  onSelectedItemsChange={this.handleJenisMakeup}
                  showCancelButton={true}
                />
              </View>
            </View>
          )}
          {user.isMua && (
            <View style={styles.fieldWrapper}>
              <Text>Jenis Produk</Text>
              <View style={[styles.field, { paddingHorizontal: 4 }]}>
                <MultiSelect
                  items={jenisProduk()}
                  uniqueKey="name"
                  selectedItems={this.state.user.jenisProduk}
                  onSelectedItemsChange={this.handleJenisProduk}
                  showCancelButton={true}
                />
              </View>
            </View>
          )}
          <View style={styles.fieldWrapper}>
            <Text>Deskripsi</Text>
            <TextInput
              style={styles.field}
              multiline
              value={user.deskripsi}
              onChangeText={val => this.handleInput('deskripsi', val)}
            />
          </View>
          <View style={styles.fieldWrapper}>
            <Text>Alamat</Text>
            <TextInput
              style={styles.field}
              multiline
              value={user.alamat}
              onChangeText={val => this.handleInput('alamat', val)}
            />
          </View>
          <View style={styles.fieldWrapper}>
            <Text>Kontak</Text>
            <TextInput
              style={styles.field}
              placeholder="Whatsapp"
              value={user.wa}
              onChangeText={val => this.handleInput('wa', val)}
            />
            <TextInput
              style={styles.field}
              placeholder="Instagram"
              value={user.ig}
              onChangeText={val => this.handleInput('ig', val)}
            />
          </View>
          <TouchableOpacity onPress={this.handleSave}>
            <View style={styles.btnSave}>
              <Text style={styles.btnSaveText}>Simpan</Text>
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
  fieldWrapper: {
    marginBottom: 16,
  },
  field: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    paddingHorizontal: 16,
    marginVertical: 4,
  },
  btnSave: {
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    borderRadius: 4,
  },
  btnSaveText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default EditProfileScreen;
