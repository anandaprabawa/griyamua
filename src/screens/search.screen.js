import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Picker,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DatePicker from 'react-native-datepicker';
import { theme } from '../theme';
// import firebase from 'react-native-firebase';

export const highEndProduct = [
  'Benefit',
  'Bobbi Brown',
  'Anastasia Beverly Hills',
  'MAC',
  'Yues Saint Laurent',
  'Sephora',
  'Makeup Forever',
  'Chanel',
  'Urban Decay',
  'Becca',
  'The Body Shop',
  'Milani',
  'Bourjois',
  'Kiehls',
  'Charlotte Tilbury',
  'NYC',
  'Merle Norman',
  'Max Factor',
  'Laneige',
  'Huda Beauty',
  'Marc Jacob',
  'Clinique',
  'Bare Minerals',
];

export const drugStoreProduct = [
  'Maybelline',
  'Make Over',
  'Loreal',
  'Wardah',
  'Wet n Wild',
  'Focallure',
  'Viva',
  'L.A Girl',
  'Etude House',
  'Latulip',
  'By Lizzie Parra',
  'Emina',
];

class SearchScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Pencarian',
  };

  handleSearch = async () => {
    // const mua = [];
    // const getMua = await firebase
    //   .firestore()
    //   .collection('users')
    //   .where('isMua', '==', true)
    //   .get();
    // getMua.forEach(snapshot => {
    //   const data = snapshot.data();
    //   if (data.uid !== firebase.auth().currentUser.uid) {
    //     mua.push(snapshot.data());
    //   }
    // });
    this.props.navigation.push('SearchResult');
  };

  render() {
    return (
      <ScrollView style={styles.scroll}>
        <View style={styles.searchRoot}>
          <View style={styles.searchBox}>
            <TextInput placeholder="Cari MUA" style={styles.searchInput} />
            <Icon name="magnify" size={24} />
          </View>
        </View>
        <Text style={styles.label}>Jenis Makeup</Text>
        <View style={styles.selectField}>
          <Picker selectedValue="natural">
            <Picker.Item label="Natural" value="Natural" />
            <Picker.Item label="Flawless" value="Flawless" />
            <Picker.Item label="Korean" value="Korean" />
            <Picker.Item label="Payas Agung" value="Payas Agung" />
            <Picker.Item label="Graduation" value="Graduation" />
          </Picker>
        </View>
        <Text style={styles.label}>Jenis Produk</Text>
        <View style={styles.selectField}>
          <Picker selectedValue="High End">
            <Picker.Item label="High End" value="High End" />
            <Picker.Item label="Drugstore" value="Drug Store" />
          </Picker>
        </View>
        <Text style={styles.label}>Cari Berdasarkan Tanggal</Text>
        <DatePicker
          style={{
            width: '100%',
            height: 48,
            marginBottom: 8,
          }}
          date={new Date()}
          mode="date"
          placeholder="Pilih tanggal"
          format="YYYY-MM-DD"
          confirmBtnText="Ok"
          cancelBtnText="Batal"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              right: 0,
              top: 8,
              marginLeft: 0,
            },
            dateInput: {
              borderRadius: 4,
              height: 48,
              width: '100%',
              top: 0,
              position: 'absolute',
              borderColor: '#ddd',
            },
          }}
          // onDateChange={this.handleChangeText('tanggalLahir')}
        />
        <Text style={styles.label}>Urut berdasarkan harga</Text>
        <View>
          <TextInput
            placeholder="Min"
            style={styles.textInput}
            keyboardType="numeric"
          />
          <TextInput
            placeholder="Max"
            style={styles.textInput}
            keyboardType="numeric"
          />
        </View>
        <TouchableOpacity onPress={this.handleSearch}>
          <View style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Cari</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: 16,
  },
  searchRoot: {
    marginTop: 24,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBox: {
    borderWidth: 1,
    borderColor: '#eee',
    paddingHorizontal: 16,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    paddingRight: 16,
  },
  filterIcon: {
    marginLeft: 16,
  },
  selectField: {
    borderWidth: 1,
    borderColor: '#eee',
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  label: {
    marginBottom: 8,
    marginTop: 16,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#eee',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  searchButton: {
    backgroundColor: theme.colors.primary,
    height: 48,
    marginTop: 32,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SearchScreen;
