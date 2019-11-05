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
import firebase from 'react-native-firebase';
import { theme } from '../theme';

class DaftarMUA extends React.Component {
  static navigationOptions = {
    title: 'Daftar sebagai MUA',
  };

  state = {
    email: '',
    username: '',
    password: '',
    konfirmasiPassword: '',
    error: '',
    isLoading: false,
  };

  handleChangeText = stateName => value => {
    this.setState({ [stateName]: value, error: '' });
  };

  handlePressSelanjutnya = async () => {
    const { email, username, password, konfirmasiPassword } = this.state;
    if (
      email !== '' &&
      username !== '' &&
      password !== '' &&
      konfirmasiPassword !== '' &&
      password === konfirmasiPassword
    ) {
      this.setState({ isLoading: true });

      const usernameFound = await firebase
        .firestore()
        .collection('users')
        .where('username', '==', username)
        .get();

      if (!usernameFound.empty) {
        this.setState({ error: 'Username sudah terpakai.', isLoading: false });
      } else {
        const emailFound = await firebase
          .firestore()
          .collection('users')
          .where('email', '==', email)
          .get();

        if (!emailFound.empty) {
          this.setState({ error: 'Email sudah terpakai', isLoading: false });
        } else {
          this.setState({ isLoading: false });
          this.props.navigation.navigate('DaftarMUA2', {
            email,
            username,
            password,
            konfirmasiPassword,
          });
        }
      }
    }
  };

  render() {
    const {
      email,
      username,
      password,
      konfirmasiPassword,
      isLoading,
      error,
    } = this.state;

    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.stepperWrapper}>
            <View style={styles.stepperLine} />
            <View style={[styles.stepperNumber, styles.stepperSelected]}>
              <Text style={[styles.stepperText, styles.stepperSelectedText]}>
                1
              </Text>
            </View>
            <View style={styles.stepperNumber}>
              <Text style={styles.stepperText}>2</Text>
            </View>
            <View style={styles.stepperNumber}>
              <Text style={styles.stepperText}>3</Text>
            </View>
          </View>

          {/* FORM */}
          <View style={styles.formWrapper}>
            <Text style={styles.inputLabel}>E-mail</Text>
            <TextInput
              style={styles.inputField}
              onChangeText={this.handleChangeText('email')}
              value={email}
            />
            <Text style={styles.inputLabel}>Username</Text>
            <TextInput
              style={styles.inputField}
              onChangeText={this.handleChangeText('username')}
              value={username}
            />
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              secureTextEntry
              style={styles.inputField}
              onChangeText={this.handleChangeText('password')}
              value={password}
            />
            <Text style={styles.inputLabel}>Konfirmasi Password</Text>
            <TextInput
              secureTextEntry
              style={styles.inputField}
              onChangeText={this.handleChangeText('konfirmasiPassword')}
              value={konfirmasiPassword}
            />
            {error !== '' ? (
              <Text style={{ color: 'red' }}>{error}</Text>
            ) : (
              <TouchableOpacity
                onPress={this.handlePressSelanjutnya}
                disabled={isLoading}
              >
                <View style={styles.button}>
                  {isLoading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.buttonText}>Selanjutnya</Text>
                  )}
                </View>
              </TouchableOpacity>
            )}
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
});

export default DaftarMUA;
