import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import image1 from '../assets/beauty-class.jpeg';

class SearchResultScreen extends React.Component {
  static navigationOptions = {
    title: 'Hasil Pencarian',
  };

  render() {
    // const mua = this.props.navigation.getParam('mua');

    return (
      <ScrollView>
        <View style={{ padding: 16 }}>
          {[0, 1].map(m => (
            <TouchableWithoutFeedback
              key={`hasilcari-${m}`}
              onPress={() =>
                this.props.navigation.navigate('SearchResultAccount')
              }
            >
              <View style={styles.muaCardRoot}>
                <Image
                  source={image1}
                  style={styles.muaCardImage}
                  resizeMode="cover"
                />
                <View>
                  <Text style={styles.muaCardName}>Eldy Pramana</Text>
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
