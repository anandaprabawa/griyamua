import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Rating } from 'react-native-ratings';
import firebase from 'react-native-firebase';

class ReviewScreen extends React.Component {
  static navigationOptions = {
    title: 'Ulasan',
  };

  state = {
    data: [],
  };

  componentDidMount() {
    const user = this.props.navigation.getParam('user');
    const loginUser = firebase.auth().currentUser;
    const data = [];
    firebase
      .firestore()
      .collection('users')
      .doc(user ? user.uid : loginUser.uid)
      .collection('ulasan')
      .onSnapshot(snapshot => {
        snapshot.forEach(doc => {
          data.push(doc.data());
        });
        this.setState({ data });
      });
  }

  render() {
    return (
      <ScrollView>
        {this.state.data.map((v, i) => (
          <View style={styles.cardRoot} key={`ulasan-${i}`}>
            <Text style={styles.name}>{v.namaPengulas}</Text>
            {/* <View style={styles.ratingWrapper}>
              <Rating
                imageSize={16}
                startingValue={5}
                readonly
                style={styles.profileInfoRating}
              />
            </View> */}
            <Text style={styles.reviewText}>{v.ulasan}</Text>
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
