import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  Dimensions,
  ScrollView,
} from 'react-native';
import firebase from 'react-native-firebase';
import { GoogleSignin } from 'react-native-google-signin';
import { Formik } from 'formik';
import * as Yup from 'yup';
import griyamuaImage from '../assets/griyamua-white.png';
import Loading from '../components/loading.componnet';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email tidak valid')
    .required('Email dibutuhkan'),
  password: Yup.string().required('Password dibutuhkan'),
});

class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    isLoading: false,
  };

  componentWillUnmount() {
    this.setState({ isLoading: false });
  }

  handleChangeInput = field => value => {
    this.setState({ [field]: value });
  };

  handleSigninByGoogle = async () => {
    const { navigation } = this.props;

    try {
      this.setState({ isLoading: true });
      const data = await GoogleSignin.signIn();
      // create a new firebase credential with the token
      const credential = firebase.auth.GoogleAuthProvider.credential(
        data.idToken,
        data.accessToken,
      );
      // login with credential
      const getUser = await firebase.auth().signInWithCredential(credential);
      const getU = await firebase
        .firestore()
        .collection('users')
        .doc(getUser.user.uid)
        .get();
      const currUser = getU.data();
      this.setState({ isLoading: false });
      navigation.navigate(currUser.isMua ? 'MainMua' : 'Main');
      return null;
    } catch (error) {
      this.setState({ isLoading: false });
      return null;
    }
  };

  handleSigninByEmail = async (values, actions) => {
    const { navigation } = this.props;

    try {
      this.setState({ isLoading: true });
      await firebase
        .auth()
        .signInWithEmailAndPassword(values.email, values.password);
      actions.setSubmitting(false);
      return navigation.navigate('Main');
    } catch (error) {
      actions.setFieldError('email', 'Pengguna tidak ditemukan');
      actions.setSubmitting(false);
      this.setState({ isLoading: false });
      return null;
    }
  };

  handlePressLupaPassword = async () => {
    this.props.navigation.navigate('LupaPassword');
  };

  render() {
    const { isLoading } = this.state;

    return (
      <React.Fragment>
        <StatusBar barStyle="light-content" backgroundColor="#f06392" />
        {isLoading && <Loading />}
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.root}>
            <View style={styles.imageWrapper}>
              <Image
                source={griyamuaImage}
                resizeMode="contain"
                style={styles.image}
              />
            </View>
            <View style={styles.inputWrapper}>
              {/* <TouchableOpacity onPress={this.handleSigninByGoogle}>
                <View style={styles.button}>
                  <Image source={googelIcon} style={styles.googleIcon} />
                  <Text style={styles.buttonText}>Masuk dengan Google</Text>
                </View>
              </TouchableOpacity>
              <Text style={styles.orText}>Atau masuk dengan</Text> */}

              <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={this.handleSigninByEmail}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                  isValid,
                }) => (
                  <React.Fragment>
                    <TextInput
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      placeholder="Email"
                      placeholderTextColor="#ddd"
                      autoCapitalize="none"
                      autoCompleteType="email"
                      keyboardType="email-address"
                      style={styles.input}
                    />
                    {errors.email && touched.email && (
                      <Text style={styles.errorField}>{errors.email}</Text>
                    )}
                    <TextInput
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      placeholder="Kata sandi"
                      placeholderTextColor="#ddd"
                      autoCapitalize="none"
                      autoCompleteType="off"
                      secureTextEntry
                      style={styles.input}
                    />
                    {errors.password && touched.password && (
                      <Text style={styles.errorField}>{errors.password}</Text>
                    )}
                    <View style={styles.lupaPasswordView}>
                      <TouchableWithoutFeedback
                        onPress={this.handlePressLupaPassword}
                      >
                        <Text style={styles.lupaPasswordText}>
                          Lupa password
                        </Text>
                      </TouchableWithoutFeedback>
                    </View>
                    <TouchableOpacity
                      disabled={!isValid}
                      onPress={handleSubmit}
                    >
                      <View style={styles.button}>
                        <Text style={styles.buttonText}>Masuk</Text>
                      </View>
                    </TouchableOpacity>
                  </React.Fragment>
                )}
              </Formik>
            </View>
          </View>
        </ScrollView>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#f06392',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: Dimensions.get('window').height * 0.2,
    paddingBottom: Dimensions.get('window').height * 0.1,
  },
  imageWrapper: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: 100,
    marginBottom: 64,
  },
  image: {
    flex: 1,
  },
  loginText: {
    color: '#fff',
  },
  inputWrapper: {
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#fff',
    borderStyle: 'solid',
    borderRadius: 24,
    marginVertical: 4,
    height: 48,
    paddingHorizontal: 16,
    color: '#fff',
  },
  button: {
    width: '100%',
    height: 48,
    backgroundColor: '#fff',
    borderRadius: 24,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    fontWeight: '700',
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 16,
    color: '#333',
  },
  googleIcon: {
    position: 'absolute',
    width: 24,
    height: 24,
    left: 16,
  },
  orText: {
    textAlign: 'center',
    color: '#fff',
    marginVertical: 24,
    fontWeight: '600',
  },
  errorField: {
    color: '#fff',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  lupaPasswordView: {
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    marginTop: 24,
  },
  lupaPasswordText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default LoginScreen;
