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
import firebase from 'react-native-firebase';
import { theme } from '../theme';
import { jMakeup, pMakeup } from './daftar-mua3.screen';

class SearchScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Pencarian',
  };

  state = {
    nama: '',
    jenisMakeup: 'Semua',
    produkMakeup: 'Semua',
    tanggal: new Date(),
    minHarga: '',
    maxHarga: '',
  };

  handleInput = field => val => {
    this.setState({ [field]: val });
  };

  filterMua = allData => {
    const [mua, df] = allData;
    const {
      nama,
      jenisMakeup,
      produkMakeup,
      tanggal,
      minHarga,
      maxHarga,
    } = this.state;

    return new Promise(resolve => {
      const filterNama = name =>
        nama !== '' ? name.toLowerCase().includes(nama.toLowerCase()) : true;

      const filterJenisMakeup = j =>
        jenisMakeup !== 'Semua' ? j.includes(jenisMakeup) : true;

      const filterProdukMakeup = p =>
        produkMakeup !== 'Semua' ? p.includes(produkMakeup) : true;

      const filterMinHarga = muaId => {
        const hasDF = df.filter(val => val.ownerId === muaId);
        const hasHarga = hasDF.filter(
          val => parseInt(val.harga, 10) >= parseInt(minHarga, 10),
        );
        if (minHarga === '') {
          return hasDF.length > 0;
        }
        return hasHarga.length > 0;
      };

      const filterMaxHarga = muaId => {
        const hasDF = df.filter(val => val.ownerId === muaId);
        const hasHarga = hasDF.filter(
          val => parseInt(val.harga, 10) <= parseInt(maxHarga, 10),
        );
        if (maxHarga === '') {
          return hasDF.length > 0;
        }
        return hasHarga.length > 0;
      };

      const newMua = mua.filter(m => {
        if (
          filterNama(m.namaLengkap) &&
          filterJenisMakeup(m.jenisMakeup) &&
          filterProdukMakeup(m.produkMakeup) &&
          filterMinHarga(m.uid) &&
          filterMaxHarga(m.uid)
        ) {
          return true;
        }
        return false;
      });

      resolve(newMua);
    });
  };

  handleGetMua = async () => {
    const mua = [];
    const getMua = await firebase
      .firestore()
      .collection('users')
      .where('isMua', '==', true)
      .get();
    getMua.forEach(snapshot => {
      const data = snapshot.data();
      if (data.uid !== firebase.auth().currentUser.uid) {
        mua.push(snapshot.data());
      }
    });
    return mua;
  };

  handleGetDaftarHarga = async () => {
    const listHarga = [];
    const df = await firebase
      .firestore()
      .collection('daftar-harga')
      .get();
    df.forEach(snapshot => {
      listHarga.push(snapshot.data());
    });
    return listHarga;
  };

  handleSearch = async () => {
    const { navigation } = this.props;
    const allData = await Promise.all([
      this.handleGetMua(),
      this.handleGetDaftarHarga(),
    ]);
    const filteredMua = await this.filterMua(allData);
    navigation.push('SearchResult', { mua: filteredMua });
  };

  render() {
    const {
      jenisMakeup,
      produkMakeup,
      maxHarga,
      minHarga,
      tanggal,
      nama,
    } = this.state;

    return (
      <ScrollView style={styles.scroll}>
        <View style={styles.searchRoot}>
          <View style={styles.searchBox}>
            <TextInput
              placeholder="Cari MUA"
              style={styles.searchInput}
              value={nama}
              onChangeText={this.handleInput('nama')}
            />
            <Icon name="magnify" size={24} />
          </View>
        </View>
        <Text style={styles.label}>Jenis Makeup</Text>
        <View style={styles.selectField}>
          <Picker
            selectedValue={jenisMakeup}
            onValueChange={this.handleInput('jenisMakeup')}
          >
            {['Semua', ...jMakeup].map(jm => (
              <Picker.Item key={jm} label={jm} value={jm} />
            ))}
          </Picker>
        </View>
        <Text style={styles.label}>Produk Makeup</Text>
        <View style={styles.selectField}>
          <Picker
            selectedValue={produkMakeup}
            onValueChange={this.handleInput('produkMakeup')}
          >
            {['Semua', ...pMakeup].map(pm => (
              <Picker.Item key={pm} label={pm} value={pm} />
            ))}
          </Picker>
        </View>
        <Text style={styles.label}>Cari Berdasarkan Tanggal</Text>
        <DatePicker
          style={{
            width: '100%',
            height: 48,
            marginBottom: 8,
          }}
          date={tanggal}
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
          onDateChange={this.handleInput('tanggal')}
        />
        <Text style={styles.label}>Urut berdasarkan harga</Text>
        <View>
          <TextInput
            placeholder="Min"
            style={styles.textInput}
            keyboardType="numeric"
            value={minHarga}
            onChangeText={this.handleInput('minHarga')}
          />
          <TextInput
            placeholder="Max"
            style={styles.textInput}
            keyboardType="numeric"
            value={maxHarga}
            onChangeText={this.handleInput('maxHarga')}
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
