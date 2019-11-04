import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import firebase from 'react-native-firebase';
import {
  getHours,
  getMinutes,
  setMinutes,
  setHours,
  addMinutes,
} from 'date-fns';
import OneSignal from 'react-native-onesignal';
import { theme } from '../theme';

class PesanScreen extends React.Component {
  static navigationOptions = {
    title: 'Pesanan',
  };

  constructor(props) {
    super(props);
    this.state = {
      mua: props.navigation.getParam('mua'),
      item: props.navigation.getParam('item'),
      user: null,
      jumlahOrang: '1',
      tanggalPesanan: null,
      jamPesanan: null,
      informasiTambahan: '',
      error: '',
    };
  }

  componentDidMount() {
    const { currentUser } = firebase.auth();
    firebase
      .firestore()
      .collection('users')
      .doc(currentUser.uid)
      .get()
      .then(user => {
        this.setState({ user: user.data() });
      });
  }

  handleChangeInput = field => val => {
    this.setState({ [field]: val });
  };

  handleChangeInputDateTime = field => (valString, valDate) => {
    this.setState({ [field]: valDate });
  };

  handleChangeInputUser = key => val => {
    this.setState(prev => ({ user: { ...prev.user, [key]: val } }));
  };

  validateJadwal = async () => {
    const { mua } = this.state;
    return firebase
      .firestore()
      .collection('pesanan')
      .where('muaId', '==', mua.uid)
      .get()
      .then(snapshot => {
        const tanggalPesanan = this.calcTanggalPesanan();
        const da = snapshot.docs.some(doc => {
          const d = { ...doc.data(), id: doc.id };
          if (
            tanggalPesanan.startDateTime >= d.tanggalPesanan.toDate() &&
            tanggalPesanan.startDateTime <= d.akhirTanggalPesanan.toDate()
          ) {
            return true;
          }
          return false;
        });
        if (da) {
          return Promise.reject(new Error('Pilih tanggal atau jam lain'));
        }
        return Promise.resolve();
      });
  };

  validateForm = async () => {
    const { tanggalPesanan, jamPesanan } = this.state;
    if (tanggalPesanan === null || jamPesanan === null) {
      return Promise.reject();
    }
    return Promise.resolve();
  };

  calcTanggalPesanan = () => {
    const { tanggalPesanan, jamPesanan, jumlahOrang, item } = this.state;
    const startDateTime = setHours(
      setMinutes(tanggalPesanan, getMinutes(jamPesanan)),
      getHours(jamPesanan),
    );

    const endDateTime = addMinutes(
      startDateTime,
      this.calcEstimasiPengerjaan(jumlahOrang, item.lamaPengerjaan),
    );

    return { startDateTime, endDateTime };
  };

  sendNotif = async mua => {
    OneSignal.postNotification(
      {
        en: 'Ada Pesanan',
      },
      { title: 'Ada Pesanan' },
      mua.playerId,
      { include_external_user_ids: [] },
    );
  };

  handlePesan = async () => {
    const { navigation } = this.props;
    const { item, mua, informasiTambahan, jumlahOrang, user } = this.state;
    try {
      this.setState({ error: '' });
      await this.validateForm();
      await this.validateJadwal();
      const tanggalPesan = this.calcTanggalPesanan();
      const detailPesanan = {
        ...user,
        ...item,
        namaPemesan: user.namaLengkap,
        informasiTambahan,
        tanggalPesanan: tanggalPesan.startDateTime,
        akhirTanggalPesanan: tanggalPesan.endDateTime,
        jumlahOrang,
        muaId: mua.uid,
        namaMua: mua.namaLengkap,
        pemesanId: user.uid,
        status: 1,
        muaPlayerId: mua.playerId,
        pemesanPlayerId: user.playerId,
      };
      await firebase
        .firestore()
        .collection('pesanan')
        .add(detailPesanan);
      await this.sendNotif(mua);
      navigation.navigate('DetailBooking', { data: detailPesanan });
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  calcEstimasiPengerjaan = (jumlahOrang, lamaPengerjaan) => {
    return jumlahOrang * lamaPengerjaan;
  };

  caclTotalHarga = (jumlahOrang, harga) => {
    return jumlahOrang * harga;
  };

  render() {
    const {
      mua,
      item,
      user,
      jumlahOrang,
      tanggalPesanan,
      jamPesanan,
      informasiTambahan,
      error,
    } = this.state;

    return (
      <React.Fragment>
        <ScrollView>
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
                value={user && (user.namaLengkap || '')}
                editable={false}
              />
            </View>
            <View style={styles.fieldWrapper}>
              <Text>No. Hp/Telepon</Text>
              <TextInput
                style={styles.field}
                value={user && (user.telepon || '')}
                onChangeText={this.handleChangeInputUser('telepon')}
              />
            </View>
            <View style={styles.fieldWrapper}>
              <Text>Alamat kamu</Text>
              <TextInput
                style={styles.field}
                value={user && (user.alamatLengkap || '')}
                onChangeText={this.handleChangeInputUser('alamatLengkap')}
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
                date={tanggalPesanan}
                mode="date"
                placeholder="Pilih tanggal"
                format="DD MMMM YYYY"
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
                onDateChange={this.handleChangeInputDateTime('tanggalPesanan')}
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
                date={jamPesanan}
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
                onDateChange={this.handleChangeInputDateTime('jamPesanan')}
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
              <Text>Jumlah Orang</Text>
              <TextInput
                style={styles.field}
                keyboardType="numeric"
                value={jumlahOrang}
                onChangeText={this.handleChangeInput('jumlahOrang')}
              />
            </View>
            <View style={styles.fieldWrapper}>
              <Text>Informasi Tambahan</Text>
              <TextInput
                style={styles.field}
                multiline
                placeholder="Optional"
                numberOfLines={5}
                value={informasiTambahan}
                onChangeText={this.handleChangeInput('infoTambahan')}
              />
            </View>
            {error !== '' && (
              <Text style={{ color: 'red', marginVertical: 16 }}>
                {`*${error}`}
              </Text>
            )}
          </View>
          <View style={{ backgroundColor: '#ffebee', padding: 16 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
              {item.nama}
            </Text>
            <Text>{`MUA: ${mua.namaLengkap}`}</Text>
            <Text>{`Jenis Makeup: ${item.jenisMakeup}`}</Text>
            <Text>{`Layanan: ${item.layanan}`}</Text>
            <Text>{`Lama Pengerjaan: ${item.lamaPengerjaan} menit`}</Text>
            <Text>{`Harga: Rp ${item.harga}`}</Text>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#ccc',
                marginVertical: 8,
              }}
            />
            <Text>{`Jumlah orang: ${jumlahOrang}`}</Text>
            <Text>
              {`Estimasi pengerjaan: ${this.calcEstimasiPengerjaan(
                jumlahOrang,
                item.lamaPengerjaan,
              )} menit`}
            </Text>
            <Text>
              {`Total harga: Rp ${this.caclTotalHarga(
                jumlahOrang,
                item.harga,
              )}`}
            </Text>
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
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Pesan</Text>
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
