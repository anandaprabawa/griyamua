import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  Linking,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { Rating } from 'react-native-ratings';
import ImagePicker from 'react-native-image-crop-picker';
import firebase from 'react-native-firebase';
import image from '../assets/account-circle.png';
import { theme } from '../theme';

class AccountScreen extends React.Component {
  static navigationOptions = {
    title: 'Profil',
  };

  state = {
    user: null,
  };

  componentDidMount() {
    this.handleGetUser();
  }

  handleGetUser = () => {
    const { navigation } = this.props;
    const userFromSearch = navigation.getParam('user');
    if (userFromSearch) {
      this.setState({ user: userFromSearch });
    } else {
      const currUser = firebase.auth().currentUser;
      firebase
        .firestore()
        .collection('users')
        .doc(currUser.uid)
        .onSnapshot(doc => {
          this.setState({
            user: { ...doc.data(), uid: currUser.uid },
          });
        });
    }
  };

  handleClickAvatar = () => {
    const { user } = this.state;

    ImagePicker.openPicker({
      compressImageMaxWidth: 512,
      compressImageMaxHeight: 512,
      compressImageQuality: 0.7,
      mediaType: 'photo',
      cropping: true,
      includeBase64: true,
    }).then(async img => {
      const dataImg = `data:${img.mime};base64,${img.data}`;
      await firebase
        .firestore()
        .collection('users')
        .doc(user.uid)
        .set({ ...user, avatar: dataImg }, { merge: true });
      this.setState({ user: { ...user, avatar: dataImg } });
    });
  };

  render() {
    const { user } = this.state;
    const avatar = user && user.avatar ? { uri: user.avatar } : image;
    const { navigation } = this.props;

    return (
      <ScrollView>
        <View style={styles.profileWrapper}>
          <TouchableWithoutFeedback onPress={this.handleClickAvatar}>
            <View style={styles.profileImageWrapper}>
              <Image source={avatar} style={styles.profileImage} />
              <Icon name="camera" size={24} style={styles.profileCameraIcon} />
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.profileInfoWrapper}>
            <Text style={styles.profileInfoName}>
              {user && (user.namaLengkap || user.email || null)}
            </Text>
            <Text style={styles.profileInfoUsername} numberOfLines={1}>
              {user && user.username}
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.push('EditProfile', {
                  user,
                })
              }
            >
              <View style={styles.btnEditProfile}>
                <Text style={styles.btnEditText}>Edit Profile</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {user && user.jenisMakeup && (
          <View style={styles.categoryWrapper}>
            <Text style={styles.categoryTitle}>Jenis Makeup</Text>
            <Text style={styles.categoryListText}>
              {user.jenisMakeup.join(', ')}
            </Text>
          </View>
        )}
        {user && user.produkMakeup && (
          <View style={styles.categoryWrapper}>
            <Text style={styles.categoryTitle}>Jenis Produk</Text>
            <Text style={styles.categoryListText}>
              {user.produkMakeup.join(', ')}
            </Text>
          </View>
        )}
        {user && user.alamatLengkap && (
          <View style={styles.descWrapper}>
            <Text style={styles.descTitle}>Alamat</Text>
            <Text style={styles.descContent}>{user.alamatLengkap}</Text>
          </View>
        )}
        {user && user.jenisKelamin !== undefined && (
          <View style={styles.descWrapper}>
            <Text style={styles.descTitle}>Jenis Kelamin</Text>
            <Text style={styles.descContent}>
              {user.jenisKelamin === 0 ? 'Laki-laki' : 'Perempuan'}
            </Text>
          </View>
        )}
        {user && user.tanggalLahir && (
          <View style={styles.descWrapper}>
            <Text style={styles.descTitle}>Tanggal Lahir</Text>
            <Text style={styles.descContent}>
              {new Date(user.tanggalLahir.toDate()).toDateString().slice(4)}
            </Text>
          </View>
        )}
        {user && (user.telepon || user.wa) && (
          <View style={styles.contactWrapper}>
            <Text style={styles.contactTitle}>Kontak</Text>
            {user.telepon && (
              <TouchableWithoutFeedback
                onPress={() => {
                  Linking.openURL(`tel:${user.telepon}`);
                }}
              >
                <View style={styles.contactListWrapper}>
                  <Icon name="phone" size={24} color="#fff" />
                  <Text style={styles.contactListText}>{user.telepon}</Text>
                </View>
              </TouchableWithoutFeedback>
            )}
            {user.wa && (
              <TouchableWithoutFeedback
                onPress={() => {
                  Linking.openURL(`https://wa.me/${user.wa}`);
                }}
              >
                <View style={styles.contactListWrapper}>
                  <Icon name="whatsapp" size={24} color="#fff" />
                  <Text style={styles.contactListText}>{user.wa}</Text>
                </View>
              </TouchableWithoutFeedback>
            )}
          </View>
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  profileWrapper: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    flexDirection: 'row',
  },
  profileImageWrapper: {
    position: 'relative',
    marginRight: 24,
    height: 100,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  profileCameraIcon: {
    position: 'absolute',
    right: 4,
    bottom: 0,
    backgroundColor: '#fff',
    padding: 4,
    borderRadius: 100,
    elevation: 4,
  },
  profileInfoWrapper: {
    flex: 1,
  },
  profileInfoName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
    marginTop: 8,
  },
  profileInfoUsername: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#000',
    marginBottom: 16,
    marginTop: 0,
  },
  profileInfoLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginLeft: -4,
  },
  profileInfoLocationText: {
    fontSize: 18,
  },
  profileInfoRatingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileInfoRating: {
    display: 'flex',
    alignItems: 'flex-start',
    marginTop: 8,
  },
  profileInfoRatingText: {
    marginLeft: 8,
    marginTop: 5,
  },
  categoryWrapper: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  categoryListText: {
    lineHeight: 22,
    fontSize: 16,
  },
  descWrapper: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  descTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  descContent: {
    lineHeight: 22,
    fontSize: 16,
  },
  contactWrapper: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  contactListWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: theme.colors.primary,
    height: 48,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  contactListText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#fff',
  },
  btnEditProfile: {
    backgroundColor: theme.colors.primary,
    height: 40,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnEditText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AccountScreen;
