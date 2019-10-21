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
import image from '../assets/graduation.jpeg';
import { theme } from '../theme';

class AccountScreen extends React.Component {
  static navigationOptions = {
    title: 'Profil',
  };

  state = {
    user: {
      uid: null,
      avatar: null,
      name: null,
      jenisMakeup: [],
      produkMakeup: [],
      deskripsi: null,
      alamat: null,
      wa: null,
      ig: null,
    },
    isMe: false,
  };

  componentDidMount() {
    this.handleGetUser();
  }

  handleGetUser = () => {
    const userFromSearch = this.props.navigation.getParam('user');
    if (userFromSearch) {
      this.setState({ user: userFromSearch, isMe: false });
    } else {
      const currUser = firebase.auth().currentUser;
      firebase
        .firestore()
        .collection('users')
        .doc(currUser.uid)
        .onSnapshot(doc => {
          this.setState({
            user: { ...doc.data(), uid: currUser.uid },
            isMe: true,
          });
        });
    }
  };

  handleClickAvatar = () => {
    if (this.state.isMe) {
      ImagePicker.openPicker({
        compressImageMaxWidth: 1024,
        compressImageMaxHeight: 1024,
        compressImageQuality: 0.8,
        mediaType: 'photo',
        cropping: true,
      }).then(async image => {
        const pathParts = image.path.split('/');
        const ref = firebase
          .storage()
          .ref(`/${pathParts[pathParts.length - 1]}`);
        await ref.putFile(image.path);
        const downloadedUrl = await ref.getDownloadURL();
        this.setState(
          { user: { ...this.state.user, avatar: downloadedUrl } },
          async () => {
            await firebase
              .firestore()
              .collection('users')
              .doc(this.state.user.uid)
              .set(this.state.user);
          },
        );
      });
    }
  };

  render() {
    const { user, isMe } = this.state;
    const avatar = user.avatar ? { uri: user.avatar } : image;

    return (
      <ScrollView>
        <View style={styles.profileWrapper}>
          <TouchableWithoutFeedback onPress={this.handleClickAvatar}>
            <View style={styles.profileImageWrapper}>
              <Image source={avatar} style={styles.profileImage} />
              {isMe && (
                <Icon
                  name="camera"
                  size={24}
                  style={styles.profileCameraIcon}
                />
              )}
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.profileInfoWrapper}>
            <Text style={styles.profileInfoName}>
              {user && user.namaLengkap ? user.namaLengkap : user.email}
            </Text>
            <Text style={styles.profileInfoUsername} numberOfLines={1}>
              {user && user.username}
            </Text>
            {isMe && (
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.push('EditProfile', {
                    user,
                  })
                }
              >
                <View style={styles.btnEditProfile}>
                  <Text style={styles.btnEditText}>Edit Profile</Text>
                </View>
              </TouchableOpacity>
            )}
            {!isMe && (
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.push('BeriUlasan', {
                    user,
                  })
                }
              >
                <View style={styles.btnEditProfile}>
                  <Text style={styles.btnEditText}>Beri Ulasan</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>
        {user.jenisMakeup && (
          <View style={styles.categoryWrapper}>
            <Text style={styles.categoryTitle}>Jenis Makeup</Text>
            <Text style={styles.categoryListText}>
              {user.jenisMakeup.join(', ')}
            </Text>
          </View>
        )}
        {user.produkMakeup && (
          <View style={styles.categoryWrapper}>
            <Text style={styles.categoryTitle}>Jenis Produk</Text>
            <Text style={styles.categoryListText}>
              {user.produkMakeup.join(', ')}
            </Text>
          </View>
        )}
        {user.alamatLengkap && (
          <View style={styles.descWrapper}>
            <Text style={styles.descTitle}>Alamat</Text>
            <Text style={styles.descContent}>{user.alamatLengkap}</Text>
          </View>
        )}
        {user.telepon && (
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
            <TouchableWithoutFeedback
              onPress={() => {
                Linking.openURL(`https://wa.me/082247555156`);
              }}
            >
              <View style={styles.contactListWrapper}>
                <Icon name="whatsapp" size={24} color="#fff" />
                <Text style={styles.contactListText}>082247555156</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                Linking.openURL(`https://instagram.com/_u/ratihardyantarii`);
              }}
            >
              <View style={styles.contactListWrapper}>
                <Icon name="instagram" size={24} color="#fff" />
                <Text style={styles.contactListText}>ratihardyantarii</Text>
              </View>
            </TouchableWithoutFeedback>
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
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  profileCameraIcon: {
    position: 'absolute',
    right: 4,
    top: 72,
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
