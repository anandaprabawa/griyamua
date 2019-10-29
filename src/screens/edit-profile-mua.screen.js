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
import DatePicker from 'react-native-datepicker';
import RadioForm from 'react-native-simple-radio-button';
import firebase from 'react-native-firebase';
import { theme } from '../theme';
import { jMakeup, pMakeup } from './daftar-mua3.screen';

const jenisMakeup = jMakeup.map(name => ({ name }));
const produkMakeup = pMakeup.map(name => ({ name }));

class EditProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Edit Profil',
  };

  constructor(props) {
    super(props);
    this.state = {
      user: props.navigation.getParam('user'),
    };
  }

  handleSave = async () => {
    const { navigation } = this.props;
    const { user } = this.state;
    await firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .set(user, { merge: true });
    navigation.goBack();
  };

  handleInput = (name, value) => {
    const { user } = this.state;
    this.setState({
      user: { ...user, [name]: value },
    });
  };

  handleJenisMakeup = selectedItems => {
    const { user } = this.state;
    this.setState({ user: { ...user, jenisMakeup: selectedItems } });
  };

  handleJenisProduk = selectedItems => {
    const { user } = this.state;
    this.setState({ user: { ...user, produkMakeup: selectedItems } });
  };

  handleInput = (name, value) => {
    const { user } = this.state;
    this.setState({
      user: { ...user, [name]: value },
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
              value={user.namaLengkap}
              onChangeText={val => this.handleInput('namaLengkap', val)}
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
          <View style={styles.fieldWrapper}>
            <Text>Jenis Makeup</Text>
            <View style={[styles.field, { paddingHorizontal: 4 }]}>
              <MultiSelect
                items={jenisMakeup}
                uniqueKey="name"
                selectedItems={user.jenisMakeup}
                onSelectedItemsChange={this.handleJenisMakeup}
                showCancelButton
              />
            </View>
          </View>
          <View style={styles.fieldWrapper}>
            <Text>Jenis Produk</Text>
            <View style={[styles.field, { paddingHorizontal: 4 }]}>
              <MultiSelect
                items={produkMakeup}
                uniqueKey="name"
                selectedItems={user.produkMakeup}
                onSelectedItemsChange={this.handleJenisProduk}
                showCancelButton
              />
            </View>
          </View>
          <View style={styles.fieldWrapper}>
            <Text>Alamat</Text>
            <TextInput
              style={styles.field}
              multiline
              value={user.alamatLengkap}
              onChangeText={val => this.handleInput('alamatLengkap', val)}
            />
          </View>
          <View style={styles.fieldWrapper}>
            <Text>Jenis Kelamin</Text>
            <RadioForm
              radio_props={[
                { label: 'Laki-laki', value: 0 },
                { label: 'Perempuan', value: 1 },
              ]}
              initial={user.jenisKelamin}
              animation
              onPress={val => this.handleInput('jenisKelamin', val)}
            />
          </View>
          <View style={styles.fieldWrapper}>
            <Text>Tanggal Lahir</Text>
            <DatePicker
              style={{
                width: '100%',
                height: 48,
                marginBottom: 8,
              }}
              date={user.tanggalLahir.toDate()}
              mode="date"
              placeholder="Pilih tanggal"
              format="YYYY-MM-DD"
              confirmBtnText="Ok"
              cancelBtnText="Batal"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  right: 0,
                  top: 8,
                  marginLeft: 0,
                },
                dateInput: {
                  borderRadius: 4,
                  height: 48,
                  width: '100%',
                  top: 0,
                  position: 'absolute',
                  borderColor: '#ddd',
                },
              }}
              onDateChange={val => this.handleInput('tanggalLahir', val)}
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
              placeholder="Telepon"
              value={user.telepon}
              onChangeText={val => this.handleInput('telepon', val)}
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
