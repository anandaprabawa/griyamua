import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import noImage from '../assets/account-circle.png';

class SearchResultScreen extends React.Component {
  static navigationOptions = {
    title: 'Hasil Pencarian',
  };

  render() {
    const { navigation } = this.props;
    const mua = navigation.getParam('mua');

    return (
      <ScrollView>
        <View style={{ padding: 16 }}>
          {mua.map(m => (
            <TouchableWithoutFeedback
              key={`hasilcari-${m.uid}`}
              onPress={() =>
                navigation.navigate('SearchResultAccount', { mua: m })
              }
            >
              <View style={styles.muaCardRoot}>
                <Image
                  source={m.avatar ? { uri: m.avatar } : noImage}
                  style={styles.muaCardImage}
                  resizeMode="cover"
                />
                <View>
                  <Text style={styles.muaCardName}>{m.namaLengkap}</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  muaCardRoot: {
    flexDirection: 'row',
    marginBottom: 24,
    alignItems: 'center',
  },
  muaCardImage: {
    width: 80,
    height: 80,
    borderRadius: 60,
    marginRight: 16,
    backgroundColor: 'gray',
  },
  muaCardName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SearchResultScreen;
