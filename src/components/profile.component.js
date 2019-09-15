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
import ImagePicker from 'react-native-image-crop-picker';
import image from '../assets/graduation.jpeg';
import { theme } from '../theme';

const Profile = () => {
  const handleClickAvatar = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
    });
  };

  return (
    <ScrollView>
      <View style={styles.profileWrapper}>
        <TouchableWithoutFeedback onPress={handleClickAvatar}>
          <View style={styles.profileImageWrapper}>
            <Image source={image} style={styles.profileImage} />
            <Icon name="camera" size={24} style={styles.profileCameraIcon} />
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.profileInfoWrapper}>
          <Text style={styles.profileInfoName}>Ida Ayu Ratih Ardyantari</Text>
          <View style={styles.profileInfoRatingWrapper}>
            <Rating
              imageSize={24}
              startingValue={5}
              readonly
              style={styles.profileInfoRating}
            />
            <Text style={styles.profileInfoRatingText}>(150)</Text>
          </View>
          <TouchableOpacity
            onPress={() => this.props.navigation.push('EditProfile')}
          >
            <View style={styles.btnEditProfile}>
              <Text style={styles.btnEditText}>Edit Profile</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.categoryWrapper}>
        <Text style={styles.categoryTitle}>Jenis Makeup</Text>
        <Text style={styles.categoryListText}>
          Graduation, Payas Agung, Wedding/Prewedding, Beauty Class, Lamaran
        </Text>
      </View>
      <View style={styles.categoryWrapper}>
        <Text style={styles.categoryTitle}>Varian Makeup</Text>
        <Text style={styles.categoryListText}>
          Korean, Bold, Flawless, Natural
        </Text>
      </View>
      <View style={styles.descWrapper}>
        <Text style={styles.descTitle}>Deskripsi</Text>
        <Text style={styles.descContent}>
          lorem ipsum dlor sit amet. lorem ipsum dolor sit amet. lorem ipsum
          dolor sit amet
        </Text>
      </View>
      <View style={styles.descWrapper}>
        <Text style={styles.descTitle}>Alamat</Text>
        <Text style={styles.descContent}>
          lorem ipsum dlor sit amet. lorem ipsum dolor sit amet. lorem ipsum
          dolor sit amet
        </Text>
      </View>
      <View style={styles.contactWrapper}>
        <Text style={styles.contactTitle}>Kontak</Text>
        <TouchableWithoutFeedback
          onPress={() => {
            Linking.openURL(`https://wa.me/6282247041997`);
          }}
        >
          <View style={styles.contactListWrapper}>
            <Icon name="whatsapp" size={24} color="#fff" />
            <Text style={styles.contactListText}>6282247041997</Text>
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
    </ScrollView>
  );
};

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
    marginBottom: 0,
    marginTop: 8,
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

export default Profile;
