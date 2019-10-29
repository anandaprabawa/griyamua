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
import image from '../assets/account-circle.png';
import { theme } from '../theme';

class AccountScreen extends React.Component {
  static navigationOptions = {
    title: 'Profil',
  };

  constructor(props) {
    super(props);
    this.state = {
      user: props.navigation.getParam('mua'),
    };
  }

  render() {
    const { user } = this.state;
    const { navigation } = this.props;
    const avatar = user.avatar ? { uri: user.avatar } : image;

    return (
      <ScrollView>
        <View style={styles.profileWrapper}>
          <TouchableWithoutFeedback onPress={this.handleClickAvatar}>
            <View style={styles.profileImageWrapper}>
              <Image source={avatar} style={styles.profileImage} />
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.profileInfoWrapper}>
            <Text style={styles.profileInfoName}>
              {user && (user.namaLengkap || user.email || null)}
            </Text>
            <Text style={styles.profileInfoUsername}>
              {user && user.username}
            </Text>
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
              onPress={() => navigation.push('BeriUlasan', { mua: user })}
            >
              <View style={styles.btnEditProfile}>
                <Text style={styles.btnEditText}>Beri Ulasan</Text>
              </View>
            </TouchableOpacity>
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
        {(user.wa || user.telepon) && (
          <View style={styles.contactWrapper}>
            <Text style={styles.contactTitle}>Kontak</Text>
            {user.wa && (
              <TouchableWithoutFeedback
                onPress={() => {
                  Linking.openURL(`tel:${user.wa}`);
                }}
              >
                <View style={styles.contactListWrapper}>
                  <Icon name="whatsapp" size={24} color="#fff" />
                  <Text style={styles.contactListText}>{user.wa}</Text>
                </View>
              </TouchableWithoutFeedback>
            )}
            {user.telepon && (
              <TouchableWithoutFeedback
                onPress={() => {
                  Linking.openURL(`https://wa.me/${user.telepon}`);
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
