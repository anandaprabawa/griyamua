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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';
import firebase from 'react-native-firebase';
import { theme } from '../theme';

const { width } = Dimensions.get('window');

class GalleryScreen extends React.Component {
  static navigationOptions = {
    title: 'Galeri',
  };

  state = {
    imageIndex: 0,
    isImageViewVisible: false,
    images: [],
  };

  async componentDidMount() {
    const loginUser = firebase.auth().currentUser;
    firebase
      .firestore()
      .collection('users')
      .doc(loginUser.uid)
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

  handleClickAdd = () => {
    ImagePicker.openPicker({
      compressImageMaxWidth: 1024,
      compressImageMaxHeight: 1024,
      compressImageQuality: 0.8,
      mediaType: 'photo',
      cropping: true,
    }).then(async image => {
      const pathParts = image.path.split('/');
      const ref = firebase
        .storage()
        .ref(`/gallery/${pathParts[pathParts.length - 1]}`);
      await ref.putFile(image.path);
      const downloadedUrl = await ref.getDownloadURL();
      await firebase
        .firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .collection('gallery')
        .add({ image: downloadedUrl });
    });
  };

  renderItem = ({ index, item }) => (
    <TouchableOpacity onPress={this.handleClickImage(index)}>
      <Image
        source={item.source}
        resizeMode="cover"
        width={item.width}
        height={item.height}
        style={styles.image}
      />
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
        <TouchableOpacity
          style={styles.addButton}
          onPress={this.handleClickAdd}
        >
          <Icon name="plus" size={32} color="#fff" />
        </TouchableOpacity>
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
