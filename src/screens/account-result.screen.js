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
import { Rating } from 'react-native-ratings';
// import { Rating } from 'react-native-ratings';
import ImagePicker from 'react-native-image-crop-picker';
// import firebase from 'react-native-firebase';
import image from '../assets/graduation.jpeg';
import { theme } from '../theme';

class AccountScreen extends React.Component {
  static navigationOptions = {
    title: 'Profil',
  };

  // state = {
  //   user: {
  //     uid: null,
  //     avatar: null,
  //     name: null,
  //     jenisMakeup: [],
  //     jenisProduk: [],
  //     deskripsi: null,
  //     alamat: null,
  //     wa: null,
  //     ig: null,
  //   },
  //   isMe: false,
  // };

  // componentDidMount() {
  //   this.handleGetUser();
  // }

  // handleGetUser = () => {
  //   const userFromSearch = this.props.navigation.getParam('user');
  //   if (userFromSearch) {
  //     this.setState({ user: userFromSearch, isMe: false });
  //   } else {
  //     const currUser = firebase.auth().currentUser;
  //     firebase
  //       .firestore()
  //       .collection('users')
  //       .doc(currUser.uid)
  //       .onSnapshot(doc => {
  //         this.setState({
  //           user: { ...doc.data(), uid: currUser.uid },
  //           isMe: true,
  //         });
  //       });
  //   }
  // };

  handleClickAvatar = () => {
    // if (this.state.isMe) {
    ImagePicker.openPicker({
      compressImageMaxWidth: 1024,
      compressImageMaxHeight: 1024,
      compressImageQuality: 0.8,
      mediaType: 'photo',
      cropping: true,
    }).then(async () => {
      // const pathParts = image.path.split('/');
      // const ref = firebase
      //   .storage()
      //   .ref(`/${pathParts[pathParts.length - 1]}`);
      // await ref.putFile(image.path);
      // const downloadedUrl = await ref.getDownloadURL();
      // this.setState(
      //   { user: { ...this.state.user, avatar: downloadedUrl } },
      //   async () => {
      //     await firebase
      //       .firestore()
      //       .collection('users')
      //       .doc(this.state.user.uid)
      //       .set(this.state.user);
      //   },
      // );
    });
    // }
  };

  render() {
    // const { user, isMe } = this.state;
    // const avatar = user.avatar ? { uri: user.avatar } : image;

    return (
      <ScrollView>
        <View style={styles.profileWrapper}>
          <TouchableWithoutFeedback onPress={this.handleClickAvatar}>
            <View style={styles.profileImageWrapper}>
              <Image source={image} style={styles.profileImage} />
              {/* {isMe && ( */}
              {/* <Icon name="camera" size={24} style={styles.profileCameraIcon} /> */}
              {/* )} */}
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.profileInfoWrapper}>
            <Text style={styles.profileInfoName}>
              {/* {user && user.name ? user.name : user.email} */}
              Eldy Pramana
            </Text>
            <Text style={styles.profileInfoUsername}>
              {/* {user && user.username} */}
              eldypramana
            </Text>
            {/* <View style={styles.profileInfoRatingWrapper}>
              <Rating
                imageSize={24}
                startingValue={5}
                readonly
                style={styles.profileInfoRating}
              />
              <Text style={styles.profileInfoRatingText}>(150)</Text>
            </View> */}
            {/* {isMe && ( */}
            <Rating
              imageSize={16}
              startingValue={5}
              readonly
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                marginTop: -16,
                paddingVertical: 12,
              }}
            />
            <TouchableOpacity
              onPress={() => this.props.navigation.push('BeriUlasan')}
            >
              <View style={styles.btnEditProfile}>
                <Text style={styles.btnEditText}>Beri Ulasan</Text>
              </View>
            </TouchableOpacity>
            {/* )} */}
            {/* {!isMe && (
              <TouchableOpacity
                onPress={() => this.props.navigation.push('BeriUlasan')}
              >
                <View style={styles.btnEditProfile}>
                  <Text style={styles.btnEditText}>Beri Ulasan</Text>
                </View>
              </TouchableOpacity>
            )} */}
          </View>
        </View>
        {/* {user.jenisMakeup && (
          <View style={styles.categoryWrapper}>
            <Text style={styles.categoryTitle}>Jenis Makeup</Text>
            <Text style={styles.categoryListText}>
              {user.jenisMakeup.join(', ')}
            </Text>
          </View>
        )} */}
        {/* {user.jenisProduk && (
          <View style={styles.categoryWrapper}>
            <Text style={styles.categoryTitle}>Jenis Produk</Text>
            <Text style={styles.categoryListText}>
              {user.jenisProduk.join(', ')}
            </Text>
          </View>
        )} */}
        {/* {user.deskripsi && (
          <View style={styles.descWrapper}>
            <Text style={styles.descTitle}>Deskripsi</Text>
            <Text style={styles.descContent}>{user.deskripsi}</Text>
          </View>
        )} */}
        <View style={styles.categoryWrapper}>
          <Text style={styles.categoryTitle}>Jenis Makeup</Text>
          <Text style={styles.categoryListText}>
            Bold, Flawless, Payas Agung, Graduation, Natural, Body Painting,
            Face Painting, Pre-wedding/Wedding,
          </Text>
        </View>
        <View style={styles.categoryWrapper}>
          <Text style={styles.categoryTitle}>Jenis Produk</Text>
          <Text style={styles.categoryListText}>
            Benefit, Nars, MAC, Borjuis, YSL, Anastasia Berverly Hills,
          </Text>
        </View>
        {/* {user.alamat && ( */}
        {/* <View style={styles.descWrapper}>
          <Text style={styles.descTitle}>Alamat</Text>
          <Text style={styles.descContent}>Jalan tukad badung</Text>
        </View> */}
        {/* )} */}
        {/* {(user.wa || user.ig) && ( */}
        <View style={styles.contactWrapper}>
          <Text style={styles.contactTitle}>Kontak</Text>
          {/* {user.wa && ( */}
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
          {/* )} */}
          {/* {user.wa && ( */}
          <TouchableWithoutFeedback
            onPress={() => {
              Linking.openURL(`https://wa.me/${user.wa}`);
            }}
          >
            <View style={styles.contactListWrapper}>
              <Icon name="whatsapp" size={24} color="#fff" />
              <Text style={styles.contactListText}>082247123321</Text>
            </View>
          </TouchableWithoutFeedback>
          {/* )} */}
          {/* {user.ig && ( */}
          <TouchableWithoutFeedback
            onPress={() => {
              Linking.openURL(`https://instagram.com/_u/ra`);
            }}
          >
            <View style={styles.contactListWrapper}>
              <Icon name="instagram" size={24} color="#fff" />
              <Text style={styles.contactListText}>eldypramana</Text>
            </View>
          </TouchableWithoutFeedback>
          {/* )} */}
        </View>
        {/* )} */}
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
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  profileCameraIcon: {
    position: 'absolute',
    right: 4,
    bottom: 4,
    backgroundColor: '#fff',
    padding: 4,
    borderRadius: 100,
    elevation: 4,
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
