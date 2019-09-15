import React from 'react';
import {
  ScrollView,
  View,
  Image,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import CheckBox from 'react-native-check-box';
import { GoogleSignin } from 'react-native-google-signin';
import firebase from 'react-native-firebase';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Loading from '../components/loading.componnet';
import griyamuaImage from '../assets/griyamua-white.png';
import googelIcon from '../assets/google-icon.png';

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
    marginBottom: 100,
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
    marginTop: 32,
    fontWeight: '700',
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 16,
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
});

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, 'Username minimal 4 karakter')
    .max(20, 'Username maksimal 20 karakter')
    .required('Username dibutuhkan'),
  email: Yup.string()
    .email('Email tidak valid')
    .required('Email dibutuhkan'),
  password: Yup.string()
    .min(6, 'Password minimal 4 karakter')
    .required('Kata sandi dibutuhkan'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Konfirmasi kata sandi tidak cocok')
    .required('Konfirmasi kata sandi dibutuhkan'),
});

class SignupScreen extends React.Component {
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

  handleSignupByGoogle = async () => {
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
      const firebaseUserCredential = await firebase
        .auth()
        .signInWithCredential(credential);
      // signup if new user
      await this.signupIfNewUser(
        firebaseUserCredential.additionalUserInfo.isNewUser,
        firebaseUserCredential.user,
      );
      navigation.navigate('Main');
      return;
    } catch (error) {
      this.setState({ isLoading: false });
    }
  };

  signupIfNewUser = (isNewUser, user) => {
    if (!isNewUser) {
      return false;
    }
    const randomString =
      Math.random()
        .toString(36)
        .substr(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15);
    const username = randomString.substr(0, 20);

    return firebase
      .firestore()
      .collection('users')
      .add({
        username,
        email: user.email,
        name: user.displayName,
        phone: user.phoneNumber,
        photo: user.photoURL,
        providerId: user.providerData[0].uid,
        uid: user.uid,
      });
  };

  handleSignupByEmail = async (values, actions) => {
    const { navigation } = this.props;

    try {
      this.setState({ isLoading: true });
      const usernameFound = await firebase
        .firestore()
        .collection('users')
        .where('username', '==', values.username)
        .get();
      if (!usernameFound.empty) {
        actions.setFieldError('username', 'Username sudah terpakai');
        actions.setSubmitting(false);
        this.setState({ isLoading: false });
      } else {
        const emailFound = await firebase
          .firestore()
          .collection('users')
          .where('email', '==', values.email)
          .get();

        if (!emailFound.empty) {
          actions.setFieldError('email', 'Email sudah terpakai');
          actions.setSubmitting(false);
          this.setState({ isLoading: false });
        } else {
          const createdUser = await firebase
            .auth()
            .createUserWithEmailAndPassword(values.email, values.password);
          await firebase
            .firestore()
            .collection('users')
            .doc(createdUser.user.uid)
            .set({
              username: values.username,
              email: values.email,
              isMua: values.isMua,
              uid: createdUser.user.uid,
            });
          navigation.navigate(values.isMua ? 'MainMua' : 'Main');
        }
      }
    } catch (error) {
      this.setState({ isLoading: false });
    }
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
            {/* <TouchableOpacity onPress={this.handleSignupByGoogle}>
              <View style={styles.button}>
                <Image source={googelIcon} style={styles.googleIcon} />
                <Text style={styles.buttonText}>Daftar dengan Google</Text>
              </View>
            </TouchableOpacity>
            <Text style={styles.orText}>Atau daftar dengan</Text> */}
            <Formik
              initialValues={{
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
                isMua: false,
              }}
              validationSchema={validationSchema}
              onSubmit={this.handleSignupByEmail}
            >
              {({
                handleChange,
                handleBlur,
                values,
                errors,
                touched,
                handleSubmit,
                setFieldValue,
                isValid,
              }) => (
                <View style={styles.inputWrapper}>
                  <TextInput
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    value={values.user}
                    placeholder="Username"
                    placeholderTextColor="#ddd"
                    autoCapitalize="none"
                    autoCompleteType="username"
                    style={styles.input}
                  />
                  {errors.username && touched.username && (
                    <Text style={styles.errorField}>{errors.username}</Text>
                  )}
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
                  <TextInput
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    value={values.confirmPassword}
                    placeholder="Konfirmasi Kata sandi"
                    placeholderTextColor="#ddd"
                    autoCapitalize="none"
                    autoCompleteType="off"
                    secureTextEntry
                    style={styles.input}
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <Text style={styles.errorField}>
                      {errors.confirmPassword}
                    </Text>
                  )}
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 16,
                    }}
                  >
                    <CheckBox
                      isChecked={values.isMua}
                      onClick={() => setFieldValue('isMua', !values.isMua)}
                      checkBoxColor="white"
                    />
                    <Text style={{ marginLeft: 8, color: 'white' }}>
                      Daftar sebagai MUA
                    </Text>
                  </View>
                  <TouchableOpacity disabled={!isValid} onPress={handleSubmit}>
                    <View style={styles.button}>
                      <Text style={styles.buttonText}>Daftar</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </View>
        </ScrollView>
      </React.Fragment>
    );
  }
}

export default SignupScreen;
