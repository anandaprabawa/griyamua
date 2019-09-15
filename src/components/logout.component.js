import React from 'react';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Logout = ({ navigation }) => {
  const handleLogout = async () => {
    await firebase.auth().signOut();
    navigation.navigate('Auth');
  };

  return (
    <Icon
      name="logout"
      size={24}
      onPress={handleLogout}
      style={{ marginRight: 16 }}
    />
  );
};

export default Logout;
