import React from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import RadioForm from 'react-native-simple-radio-button';
import { theme } from '../theme';

class DaftarMUA2 extends React.Component {
  static navigationOptions = {
    title: 'Daftar sebagai MUA',
  };

  state = {
    email: this.props.navigation.state.params.email,
    username: this.props.navigation.state.params.username,
    password: this.props.navigation.state.params.password,
    namaLengkap: '',
    alamatLengkap: '',
    telepon: '',
    tanggalLahir: new Date(),
    jenisKelamin: 0,
  };

  handleChangeText = stateName => value => {
    this.setState({ [stateName]: value });
  };

  handleSelanjutnya = async () => {
    const {
      email,
      username,
      password,
      namaLengkap,
      alamatLengkap,
      telepon,
      tanggalLahir,
      jenisKelamin,
    } = this.state;
    const data = {
      email,
      username,
      password,
      namaLengkap,
      alamatLengkap,
      telepon,
      tanggalLahir,
      jenisKelamin,
    };

    if (namaLengkap !== '' && alamatLengkap !== '' && telepon !== '') {
      this.props.navigation.navigate('DaftarMUA3', data);
    }
  };

  render() {
    const {
      namaLengkap,
      alamatLengkap,
      telepon,
      tanggalLahir,
      isLoading,
    } = this.state;

    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.stepperWrapper}>
            <View style={styles.stepperLine} />
            <View style={styles.stepperNumber}>
              <Text style={styles.stepperText}>1</Text>
            </View>
            <View style={[styles.stepperNumber, styles.stepperSelected]}>
              <Text style={[styles.stepperText, styles.stepperSelectedText]}>
                2
              </Text>
            </View>
            <View style={styles.stepperNumber}>
              <Text style={styles.stepperText}>3</Text>
            </View>
          </View>

          {/* FORM */}
          <View style={styles.formWrapper}>
            <Text style={styles.inputLabel}>Nama Lengkap</Text>
            <TextInput
              style={styles.inputField}
              onChangeText={this.handleChangeText('namaLengkap')}
              value={namaLengkap}
            />
            <Text style={styles.inputLabel}>Alamat Lengkap</Text>
            <TextInput
              style={styles.inputField}
              onChangeText={this.handleChangeText('alamatLengkap')}
              value={alamatLengkap}
            />
            <Text style={styles.inputLabel}>Telepon</Text>
            <TextInput
              keyboardType="numeric"
              style={styles.inputField}
              onChangeText={this.handleChangeText('telepon')}
              value={telepon}
            />
            <Text style={styles.inputLabel}>Tanggal Lahir</Text>
            <DatePicker
              style={{
                width: '100%',
                height: 48,
                marginBottom: 8,
              }}
              date={tanggalLahir}
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
              onDateChange={this.handleChangeText('tanggalLahir')}
            />
            <Text style={styles.inputLabel}>Jenis Kelamin</Text>
            <RadioForm
              radio_props={[
                { label: 'Laki-laki', value: 0 },
                { label: 'Perempuan', value: 1 },
              ]}
              initial={0}
              animation
              onPress={this.handleChangeText('jenisKelamin')}
            />
            <TouchableOpacity
              disabled={isLoading}
              onPress={this.handleSelanjutnya}
            >
              <View style={styles.button}>
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Selanjutnya</Text>
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
  inputField: {
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 8,
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

export default DaftarMUA2;
