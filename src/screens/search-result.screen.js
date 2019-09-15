import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';

class SearchResultScreen extends React.Component {
  static navigationOptions = {
    title: 'Hasil Pencarian',
  };

  render() {
    const mua = this.props.navigation.getParam('mua');

    return (
      <ScrollView>
        <View style={{ padding: 16 }}>
          {mua.map((m, i) => (
            <TouchableWithoutFeedback
              key={`hasilcari-${i}`}
              onPress={() =>
                this.props.navigation.navigate('SearchResultAccount', {
                  user: m,
                })
              }
            >
              <View style={styles.muaCardRoot}>
                <Image
                  source={{ uri: m.avatar }}
                  style={styles.muaCardImage}
                  resizeMode="cover"
                />
                <View>
                  <Text style={styles.muaCardName}>{m.name || m.email}</Text>
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
