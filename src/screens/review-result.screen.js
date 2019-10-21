import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Rating } from 'react-native-ratings';
import firebase from 'react-native-firebase';
import image1 from '../assets/beauty-class.jpeg';

class ReviewScreen extends React.Component {
  static navigationOptions = {
    title: 'Ulasan',
  };

  state = {
    data: [],
  };

  // componentDidMount() {
  //   const user = this.props.navigation.getParam('user');
  //   const loginUser = firebase.auth().currentUser;
  //   const data = [];
  //   firebase
  //     .firestore()
  //     .collection('users')
  //     .doc(user ? user.uid : loginUser.uid)
  //     .collection('ulasan')
  //     .onSnapshot(snapshot => {
  //       snapshot.forEach(doc => {
  //         data.push(doc.data());
  //       });
  //       this.setState({ data });
  //     });
  // }

  render() {
    return (
      <ScrollView>
        {[0, 1, 2, 3].map(val => (
          <View style={styles.cardRoot} key={val}>
            <View style={{ flexDirection: 'row' }}>
              <Image
                source={image1}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 80,
                  marginRight: 16,
                }}
              />
              <View>
                <Text style={styles.name}>Nama pengulas</Text>
                <View style={styles.ratingWrapper}>
                  <Rating
                    imageSize={16}
                    startingValue={5}
                    readonly
                    style={styles.profileInfoRating}
                  />
                </View>
                <Text style={styles.reviewText}>
                  Lorem ipsum dolor sit amet
                </Text>
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
