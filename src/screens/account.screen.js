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
    const { navigation } = this.props;
    const avatar = user && user.avatar ? { uri: user.avatar } : image;

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
              {user && (user.namaLengkap || user.email || '')}
            </Text>
            <Text style={styles.profileInfoUsername}>
              {user && user.username}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.push('EditProfile', { user })}
            >
              <View style={styles.btnEditProfile}>
                <Text style={styles.btnEditText}>Edit Profile</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {user && (
          <>
            {user.alamatLengkap && (
              <View style={styles.descWrapper}>
                <Text style={styles.descTitle}>Alamat</Text>
                <Text style={styles.descContent}>{user.alamatLengkap}</Text>
              </View>
            )}
            {user.jenisKelamin !== undefined && (
              <View style={styles.descWrapper}>
                <Text style={styles.descTitle}>Jenis Kelamin</Text>
                <Text style={styles.descContent}>
                  {user.jenisKelamin === 0 ? 'Laki-laki' : 'Perempuan'}
                </Text>
              </View>
            )}
            {user.tanggalLahir && (
              <View style={styles.descWrapper}>
                <Text style={styles.descTitle}>Tanggal Lahir</Text>
                <Text style={styles.descContent}>
                  {new Date(user.tanggalLahir.toDate()).toDateString().slice(4)}
                </Text>
              </View>
            )}
            {(user.wa || user.telepon) && (
              <View style={styles.contactWrapper}>
                <Text style={styles.contactTitle}>Kontak</Text>
                {user.wa && (
                  <TouchableWithoutFeedback
                    onPress={() => {
                      Linking.openURL(`tel:082247123321`);
                    }}
                  >
                    <View style={styles.contactListWrapper}>
                      <Icon name="whatsapp" size={24} color="#fff" />
                      <Text style={styles.contactListText}>082247123321</Text>
                    </View>
                  </TouchableWithoutFeedback>
                )}
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
              </View>
            )}
          </>
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
    height: 120,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  profileCameraIcon: {
    position: 'absolute',
    right: 4,
    top: 84,
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
