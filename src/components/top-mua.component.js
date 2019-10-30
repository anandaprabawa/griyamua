import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Rating } from 'react-native-ratings';
import firebase from 'react-native-firebase';
import noImage from '../assets/account-circle.png';

const MuaCard = ({ item }) => (
  <View style={styles.muaCardRoot}>
    <Image
      source={item.avatar ? { uri: item.avatar } : noImage}
      style={styles.muaCardImage}
      resizeMode="cover"
    />
    <View>
      <Text style={styles.muaCardName}>{item.namaLengkap}</Text>
      <Text style={styles.muaCardLocation}>{item.username}</Text>
      <Rating
        startingValue={item.rating}
        count={5}
        imageSize={16}
        readonly
        isDisabled
        style={{ display: 'flex', alignItems: 'flex-start' }}
      />
    </View>
  </View>
);

class TopMUA extends React.Component {
  state = {
    topMua: null,
  };

  componentDidMount() {
    this.calculateTopMua();
  }

  getReviews = async () => {
    return new Promise(resolve => {
      firebase
        .firestore()
        .collection('ulasan')
        .onSnapshot(snapshot => {
          const docs = [];
          snapshot.forEach(doc => {
            docs.push({ ...doc.data(), id: doc.id });
          });
          resolve(docs);
        });
    });
  };

  getMuas = async () => {
    return new Promise(resolve => {
      firebase
        .firestore()
        .collection('users')
        .where('isMua', '==', true)
        .onSnapshot(snapshot => {
          const docs = [];
          snapshot.forEach(doc => {
            docs.push({ ...doc.data(), id: doc.id });
          });
          resolve(docs);
        });
    });
  };

  calculateTopMua = async () => {
    const [reviews, muas] = await Promise.all([
      this.getReviews(),
      this.getMuas(),
    ]);

    const muasWithRating = muas.map(mua => {
      const ownReviews = reviews.filter(review => review.idMua === mua.uid);
      if (ownReviews.length === 0) {
        return null;
      }
      const totalRating = ownReviews.reduce(
        (prev, curr) => prev + curr.rating,
        0,
      );
      const rating = totalRating / ownReviews.length;

      return { ...mua, totalRating, rating };
    });
    const muasWithoutNull = muasWithRating.filter(m => m);

    const sortMuaByHighestRating = muasWithoutNull.sort((a, b) =>
      a.totalRating < b.totalRating ? 1 : -1,
    );

    const limitMua = sortMuaByHighestRating.splice(0, 10);

    this.setState({ topMua: limitMua });
  };

  render() {
    const { topMua } = this.state;

    return (
      <View style={styles.root}>
        <Text style={styles.title}>Top 10 Makeup Artist</Text>
        <View>
          {topMua && topMua.map(tm => <MuaCard key={tm.uid} item={tm} />)}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  muaCardRoot: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  muaCardImage: {
    width: 80,
    height: 80,
    borderRadius: 60,
    marginRight: 16,
  },
  muaCardName: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 8,
    marginBottom: 4,
  },
  muaCardLocation: {
    marginBottom: 8,
    fontSize: 18,
  },
});

export default TopMUA;
