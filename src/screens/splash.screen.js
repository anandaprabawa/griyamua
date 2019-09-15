import React from 'react';
import { View, StatusBar, Image, StyleSheet } from 'react-native';
import firebase from 'react-native-firebase';
import { GoogleSignin } from 'react-native-google-signin';
import griyamuaImage from '../assets/griyamua-white.png';

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#f06392',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 100,
  },
});

class SplashScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  async componentDidMount() {
    const { navigation } = this.props;

    await GoogleSignin.configure({
      webClientId:
        '651597269296-1sbu7j3ccdjrbkh67sdhokh6r3dqrv8d.apps.googleusercontent.com',
      forceConsentPrompt: true,
    });

    this.unsubscribeAuth = firebase.auth().onAuthStateChanged(user => {
      setTimeout(async () => {
        if (user) {
          const getUser = await firebase
            .firestore()
            .collection('users')
            .doc(user.uid)
            .get();
          const currUser = getUser.data();
          navigation.navigate(currUser.isMua ? 'MainMua' : 'Main', {
            user: currUser,
          });
        } else {
          navigation.navigate('App');
        }
      }, 1000);
    });
  }

  render() {
    return (
      <View style={styles.root}>
        <StatusBar barStyle="light-content" backgroundColor="#f06392" />
        <Image
          source={griyamuaImage}
          resizeMode="contain"
          style={styles.image}
        />
      </View>
    );
  }
}

export default SplashScreen;
