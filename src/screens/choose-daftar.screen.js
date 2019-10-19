import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  StatusBar,
  Dimensions,
} from 'react-native';
import griyamuaImage from '../assets/griyamua-white.png';

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#f06392',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: Dimensions.get('window').height * 0.2,
    paddingBottom: Dimensions.get('window').height * 0.1,
  },
  image: {
    height: 100,
  },
  btnWrapper: {
    width: '100%',
  },
  button: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#fff',
    borderStyle: 'solid',
    borderRadius: 24,
    height: 48,
    paddingHorizontal: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: 4,
  },
  buttonText: {
    color: '#333',
    fontWeight: '600',
    fontSize: 16,
  },
  outlineBtn: {
    backgroundColor: 'transparent',
  },
  outlineBtnText: {
    color: '#fff',
  },
});

class ChooseDaftarScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  handleClickAuth = routeName => () => {
    const { navigation } = this.props;
    navigation.navigate(routeName);
  };

  render() {
    return (
      <View style={styles.root}>
        <StatusBar barStyle="light-content" backgroundColor="#f06392" />
        <Image
          source={griyamuaImage}
          resizeMode="contain"
          style={styles.image}
        />
        <View style={styles.btnWrapper}>
          <TouchableOpacity
            style={styles.button}
            onPress={this.handleClickAuth('DaftarMUA')}
          >
            <Text style={styles.buttonText}>Daftar sebagai MUA</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button]}
            onPress={this.handleClickAuth('DaftarPelanggan')}
          >
            <Text style={[styles.buttonText]}>Daftar sebagai Pelanggan</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default ChooseDaftarScreen;
