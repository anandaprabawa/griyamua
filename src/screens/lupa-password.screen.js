import React from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Loading from '../components/loading.componnet';
import firebase from 'react-native-firebase';
import { theme } from '../theme';

class LupaPassword extends React.Component {
  static navigationOptions = {
    title: 'Lupa Password',
  };

  state = {
    email: '',
    loading: false,
  };

  handleChangeEmail = text => {
    this.setState({ email: text });
  };

  handleForgotPassword = async () => {
    const { email, loading } = this.state;
    if (email !== '' && !loading) {
      this.setState({ loading: true });
      await firebase.auth().sendPasswordResetEmail(email);
      this.props.navigation.navigate('ConfirmPassword');
      this.setState({ loading: false });
    }
  };

  render() {
    const { loading } = this.state;

    return (
      <View style={styles.container}>
        <Text>Masukkan alamat e-mail</Text>
        <TextInput
          style={styles.inputField}
          placeholder="E-mail"
          onChangeText={this.handleChangeEmail}
        />
        <TouchableOpacity
          onPress={this.handleForgotPassword}
          disabled={loading}
        >
          <View style={styles.button}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Kirim</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 16,
    borderRadius: 32,
    display: 'flex',
    alignItems: 'center',
    marginTop: 32,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
export default LupaPassword;
