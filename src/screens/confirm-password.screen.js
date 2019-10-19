import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

class ConfirmPassword extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Periksa e-mail untuk reset password!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  text: {
    fontSize: 18,
  },
});

export default ConfirmPassword;
