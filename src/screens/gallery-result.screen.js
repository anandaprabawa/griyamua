import React from 'react';
import {
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import ImageView from 'react-native-image-view';
import firebase from 'react-native-firebase';
import { theme } from '../theme';

const { width } = Dimensions.get('window');

class GalleryScreen extends React.Component {
  static navigationOptions = {
    title: 'Galeri',
  };

  constructor(props) {
    super(props);
    this.state = {
      imageIndex: 0,
      isImageViewVisible: false,
      images: [],
      user: props.navigation.getParam('mua'),
    };
  }

  async componentDidMount() {
    const { user } = this.state;
    firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .collection('gallery')
      .onSnapshot(snapshot => {
        const tempData = [];
        snapshot.forEach(snap => {
          tempData.push({
            source: { uri: snap.data().image },
            width,
            height: width,
          });
        });
        this.setState({ images: tempData });
      });
  }

  keyExtractor = (item, i) => `gallery-${i}`;

  handleClickImage = index => () => {
    this.setState({
      imageIndex: index,
      isImageViewVisible: true,
    });
  };

  renderItem = ({ index, item }) => (
    <TouchableOpacity onPress={this.handleClickImage(index)}>
      <Image source={item.source} resizeMode="cover" style={styles.image} />
    </TouchableOpacity>
  );

  render() {
    const { imageIndex, isImageViewVisible, images } = this.state;

    return (
      <React.Fragment>
        <ScrollView>
          <FlatList
            data={images}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
            numColumns={2}
            style={styles.flatList}
          />
        </ScrollView>
        <ImageView
          glideAlways
          images={images}
          imageIndex={imageIndex}
          animationType="fade"
          isVisible={isImageViewVisible}
          onClose={() => this.setState({ isImageViewVisible: false })}
        />
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  cardRoot: {
    flex: 1,
    flexWrap: 'wrap',
  },
  image: {
    width: width / 2,
    height: width / 2,
  },
  addButton: {
    backgroundColor: theme.colors.primary,
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    elevation: 4,
  },
});

export default GalleryScreen;
