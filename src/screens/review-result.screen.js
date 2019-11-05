import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Rating } from 'react-native-ratings';
import firebase from 'react-native-firebase';
import noImage from '../assets/account-circle.png';

class ReviewScreen extends React.Component {
  static navigationOptions = {
    title: 'Ulasan',
  };

  constructor(props) {
    super(props);
    this.state = {
      mua: props.navigation.getParam('mua'),
      data: [],
    };
  }

  componentDidMount() {
    const { mua } = this.state;

    firebase
      .firestore()
      .collection('ulasan')
      .where('idMua', '==', mua.uid)
      .onSnapshot(snapshot => {
        const data = [];
        snapshot.forEach(doc => {
          data.push({ ...doc.data(), uid: doc.id });
        });
        this.setState({ data });
      });
  }

  render() {
    const { data } = this.state;

    return (
      <ScrollView>
        {data.map(val => (
          <View style={styles.cardRoot} key={val.uid}>
            <View style={{ flexDirection: 'row' }}>
              <Image
                source={
                  val.avatarPengulas ? { uri: val.avatarPengulas } : noImage
                }
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 80,
                  marginRight: 16,
                }}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{val.namaPengulas}</Text>
                <View style={styles.ratingWrapper}>
                  <Rating
                    imageSize={16}
                    startingValue={val.rating}
                    readonly
                    style={styles.profileInfoRating}
                  />
                </View>
                <Text style={styles.reviewText}>{val.ulasan}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  cardRoot: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  ratingWrapper: {
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  reviewText: {
    lineHeight: 20,
  },
});

export default ReviewScreen;
