import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  Picker,
  TouchableOpacity,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import { theme } from '../theme';
// import firebase from 'react-native-firebase';

class PesanScreen extends React.Component {
  static navigationOptions = {
    title: 'Pesananmu',
  };

  // state = {
  //   mua: {},
  //   item: {},
  //   pemesan: {},
  //   tanggal: '',
  //   jam: '',
  //   jumlahOrang: 1,
  //   alamat: '',
  //   infoTambahan: '',
  // };

  componentDidMount() {
    // const mua = this.props.navigation.getParam('mua');
    // const item = this.props.navigation.getParam('item');
    // const getMe = firebase
    //   .firestore()
    //   .collection('users')
    //   .doc(firebase.auth().currentUser.uid)
    //   .get()
    //   .then(doc => {
    //     this.setState({ mua, item, pemesan: doc.data() });
    //   });
  }

  // handleChangeInput = field => val => {
  //   this.setState({ [field]: val });
  // };

  handlePesan = async () => {
    // await firebase
    //   .firestore()
    //   .collection('pesanan')
    //   .add(this.state);
    this.props.navigation.goBack();
  };

  render() {
    // const mua = this.props.navigation.getParam('mua');
    // const item = this.props.navigation.getParam('item');

    return (
      <React.Fragment>
        <ScrollView>
          {/* <View style={{ backgroundColor: '#ffebee', padding: 16 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
              Makeup Luar Biasa
            </Text>
            <Text>MUA: Eldy Pramana</Text>
            <Text>Jenis Makeup: Flawless</Text>
            <Text>Layanan: Hairdo</Text>
            <Text>Lama Pengerjaan: 2 jam</Text>
            <Text>Harga: Rp 300.000</Text>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#ccc',
                marginVertical: 8,
              }}
            />
            <Text>Jumlah orang: 1</Text>
            <Text>Estimasi pengerjaan: 2 jam</Text>
            <Text>Total harga: Rp 300.000</Text>
          </View> */}
          <View style={styles.root}>
            {/* <View style={styles.fieldWrapper}>
              <Text>Nama</Text>
              <TextInput
                style={styles.field}
                onChangeText={this.handleChangeInput('namaPemesan')}
              />
            </View> */}
            {/* <View style={styles.fieldWrapper}>
              <Text>Jenis Makeup</Text>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: '#ddd',
                  borderRadius: 4,
                  marginTop: 4,
                }}
              >
                <Picker selectedValue="">
                  <Picker.Item label="Natural" value="Natural" />
                  <Picker.Item label="Natural" value="Natural" />
                  <Picker.Item label="Flawless" value="Flawless" />
                  <Picker.Item label="Korean" value="Korean" />
                  <Picker.Item label="Payas Agung" value="Payas Agung" />
                  <Picker.Item label="Graduation" value="Graduation" />
                </Picker>
              </View>
            </View> */}
            <View style={styles.fieldWrapper}>
              <Text>Nama kamu</Text>
              <TextInput
                style={styles.field}
                // onChangeText={this.handleChangeInput('jumlahOrang')}
              />
            </View>
            <View style={styles.fieldWrapper}>
              <Text>No. Hp/Telepon</Text>
              <TextInput
                style={styles.field}
                // onChangeText={this.handleChangeInput('jumlahOrang')}
              />
            </View>
            <View style={styles.fieldWrapper}>
              <Text>Alamat kamu</Text>
              <TextInput
                style={styles.field}
                // onChangeText={this.handleChangeInput('jumlahOrang')}
              />
            </View>
            <View style={styles.fieldWrapper}>
              <Text>Tanggal Pesanan</Text>
              <DatePicker
                style={{
                  width: '100%',
                  height: 48,
                  marginTop: 4,
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
                // onDateChange={tanggal => {
                //   this.setState({ tanggal });
                // }}
              />
            </View>
            <View style={styles.fieldWrapper}>
              <Text>Jam Pesanan</Text>
              <DatePicker
                style={{
                  width: '100%',
                  height: 48,
                  marginTop: 4,
                }}
                date={new Date()}
                mode="time"
                placeholder="Pilih jam"
                format="HH:mm"
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
                // onDateChange={tanggal => {
                //   this.setState({ tanggal });
                // }}
              />
            </View>
            {/* <View style={styles.fieldWrapper}>
              <Text>Jam</Text>
              <DatePicker
                style={{
                  width: '100%',
                  height: 48,
                  marginTop: 4,
                }}
                date={this.state.jam}
                mode="time"
                placeholder="Tentukan jam"
                format="HH:mm"
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
                onDateChange={jam => {
                  this.setState({ jam });
                }}
              />
            </View> */}
            <View style={styles.fieldWrapper}>
              <Text>Banyak Orang</Text>
              <TextInput
                style={styles.field}
                keyboardType="numeric"
                // onChangeText={this.handleChangeInput('jumlahOrang')}
              />
            </View>
            <View style={styles.fieldWrapper}>
              <Text>Informasi Tambahan</Text>
              <TextInput
                style={styles.field}
                multiline
                placeholder="Optional"
                numberOfLines={5}
                // onChangeText={this.handleChangeInput('infoTambahan')}
              />
            </View>
            <TouchableOpacity onPress={this.handlePesan}>
              <View
                style={{
                  backgroundColor: theme.colors.primary,
                  height: 48,
                  borderRadius: 4,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 24,
                }}
              >
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                  Update
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    padding: 16,
  },
  fieldWrapper: {
    marginBottom: 16,
  },
  field: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginTop: 4,
  },
});

export default PesanScreen;
