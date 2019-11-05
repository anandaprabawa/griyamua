import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import firebase from 'react-native-firebase';
import { theme } from '../theme';

export const jMakeup = [
  'Bold',
  'Flawless',
  'Payas Agung',
  'Graduation',
  'Natural',
  'Body Painting',
  'Face Painting',
  'Pre-wedding/Wedding',
  'Beauty Class',
  'Traditional',
];

export const pMakeup = [
  'Benefit',
  'Nars',
  'MAC',
  'Borjuis',
  'YSL',
  'Anastasia Berverly Hills',
  'Tarte',
  'Este Lauder',
  'Laura Mercier',
  'LT Pro',
  "L'oreal",
  'Wardah',
  'Maybelline',
  'Y.O.U',
  'N.Y.X',
  'Wet n Wild',
  'Foccalure',
];

class DaftarMUA3 extends React.Component {
  static navigationOptions = {
    title: 'Daftar sebagai MUA',
  };

  state = {
    email: this.props.navigation.state.params.email,
    username: this.props.navigation.state.params.username,
    password: this.props.navigation.state.params.password,
    namaLengkap: this.props.navigation.state.params.namaLengkap,
    alamatLengkap: this.props.navigation.state.params.alamatLengkap,
    telepon: this.props.navigation.state.params.telepon,
    tanggalLahir: this.props.navigation.state.params.tanggalLahir,
    jenisKelamin: this.props.navigation.state.params.jenisKelamin,
    isLoading: false,
    jenisMakeup: [],
    produkMakeup: [],
  };

  handlePressJenisMakeup = name => () => {
    const jm = this.state.jenisMakeup;
    const found = jm.find(val => val === name);

    if (found) {
      jm.pop(name);
      this.setState({ jenisMakeup: jm });
    } else {
      jm.push(name);
      this.setState({ jenisMakeup: jm });
    }
  };

  handleGetValueJenisMakeup = name => {
    return this.state.jenisMakeup.some(val => val === name);
  };

  handlePressProdukMakeup = name => () => {
    const jm = this.state.produkMakeup;
    const found = jm.find(val => val === name);

    if (found) {
      jm.pop(name);
      this.setState({ produkMakeup: jm });
    } else {
      jm.push(name);
      this.setState({ produkMakeup: jm });
    }
  };

  handleGetValueProdukMakeup = name => {
    return this.state.produkMakeup.some(val => val === name);
  };

  handleDaftar = async () => {
    const {
      email,
      username,
      password,
      namaLengkap,
      alamatLengkap,
      telepon,
      tanggalLahir,
      jenisKelamin,
      jenisMakeup,
      produkMakeup,
    } = this.state;
    if (namaLengkap !== '' && alamatLengkap !== '' && telepon !== '') {
      this.setState({ isLoading: true });
      const res = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      await firebase
        .firestore()
        .collection('users')
        .doc(res.user.uid)
        .set({
          username,
          email,
          isMua: true,
          uid: res.user.uid,
          namaLengkap,
          alamatLengkap,
          tanggalLahir,
          jenisKelamin,
          telepon,
          jenisMakeup,
          produkMakeup,
        });
      this.setState({ isLoading: false });
      this.props.navigation.navigate('MainMUA');
    }
  };

  render() {
    const { isLoading } = this.state;

    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.stepperWrapper}>
            <View style={styles.stepperLine} />
            <View style={styles.stepperNumber}>
              <Text style={styles.stepperText}>1</Text>
            </View>
            <View style={styles.stepperNumber}>
              <Text style={styles.stepperText}>2</Text>
            </View>
            <View style={[styles.stepperNumber, styles.stepperSelected]}>
              <Text style={[styles.stepperText, styles.stepperSelectedText]}>
                3
              </Text>
            </View>
          </View>

          {/* FORM */}
          <View style={styles.formWrapper}>
            <Text style={styles.inputLabel}>Jenis Makeup</Text>
            {jMakeup.map(j => (
              <CheckBox
                key={j}
                title={j}
                onPress={this.handlePressJenisMakeup(j)}
                checked={this.handleGetValueJenisMakeup(j)}
              />
            ))}

            <Text style={[styles.inputLabel, { marginTop: 16 }]}>
              Produk Makeup
            </Text>
            {pMakeup.map(p => (
              <CheckBox
                key={p}
                title={p}
                onPress={this.handlePressProdukMakeup(p)}
                checked={this.handleGetValueProdukMakeup(p)}
              />
            ))}

            <View style={styles.skWrapper}>
              <Text style={styles.skText}>
                Dengan menekan tombol Daftar kamu menyetujui Syarat dan
                Ketentuan yang berlaku.
              </Text>
            </View>
            <TouchableOpacity disabled={isLoading} onPress={this.handleDaftar}>
              <View style={styles.button}>
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Daftar</Text>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  stepperWrapper: {
    marginTop: 16,
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  stepperLine: {
    height: 1,
    width: 250,
    backgroundColor: '#000',
    position: 'absolute',
    top: '50%',
  },
  stepperNumber: {
    borderWidth: 1,
    borderRadius: 100,
    height: 40,
    width: 40,
    marginHorizontal: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  stepperText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  stepperSelected: {
    backgroundColor: theme.colors.primary,
  },
  stepperSelectedText: {
    color: '#fff',
  },
  formWrapper: {
    marginTop: 32,
  },
  inputLabel: {
    fontSize: 16,
  },
  checkboxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  checkboxText: {
    fontSize: 15,
  },
  button: {
    backgroundColor: theme.colors.primary,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  skWrapper: {
    alignItems: 'center',
    marginTop: 24,
  },
  skText: {
    textAlign: 'center',
  },
});

export default DaftarMUA3;
