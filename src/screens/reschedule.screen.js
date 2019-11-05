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
import OneSignal from 'react-native-onesignal';
import {
  getHours,
  getMinutes,
  setMinutes,
  setHours,
  addMinutes,
} from 'date-fns';
import { theme } from '../theme';

class RescheduleScreen extends React.Component {
  static navigationOptions = {
    title: 'Jadwal Ulang',
  };

  constructor(props) {
    super(props);
    this.d = props.navigation.getParam('data');
    this.state = {
      data: {
        ...this.d,
        tanggalPesanan: this.d.tanggalPesanan.toDate(),
        akhirTanggalPesanan: this.d.akhirTanggalPesanan.toDate(),
        jamPesanan: this.d.tanggalPesanan.toDate(),
      },
      error: '',
    };
  }

  handleChangeInput = field => val => {
    this.setState(prev => ({ data: { ...prev.data, [field]: val } }));
  };

  handleChangeInputDateTime = field => (valString, valDate) => {
    this.setState(prev => ({ data: { ...prev.data, [field]: valDate } }));
  };

  validateJadwal = async () => {
    const { data } = this.state;
    return firebase
      .firestore()
      .collection('pesanan')
      .where('muaId', '==', data.muaId)
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
    const { data } = this.state;
    if (data.tanggalPesanan === null || data.jamPesanan === null) {
      return Promise.reject();
    }
    return Promise.resolve();
  };

  calcTanggalPesanan = () => {
    const { data } = this.state;
    const startDateTime = setHours(
      setMinutes(data.tanggalPesanan, getMinutes(data.jamPesanan)),
      getHours(data.jamPesanan),
    );

    const endDateTime = addMinutes(
      startDateTime,
      this.calcEstimasiPengerjaan(data.jumlahOrang, data.lamaPengerjaan),
    );

    return { startDateTime, endDateTime };
  };

  handlePesan = async () => {
    const { navigation } = this.props;
    const { data } = this.state;
    try {
      this.setState({ error: '' });
      await this.validateForm();
      await this.validateJadwal();
      const tanggalPesan = this.calcTanggalPesanan();
      const detailPesanan = {
        ...data,
        tanggalPesanan: tanggalPesan.startDateTime,
        akhirTanggalPesanan: tanggalPesan.endDateTime,
        status: 1,
      };
      await firebase
        .firestore()
        .collection('pesanan')
        .doc(data.id)
        .set(detailPesanan, { merge: true });
      // navigation.navigate('DetailBooking', { data: detailPesanan });
      OneSignal.postNotification(
        {
          en: 'Permintaan jadwal ulang pesanan',
        },
        { title: 'Ada Pesanan' },
        data.muaPlayerId,
        { include_external_user_ids: [] },
      );
      navigation.pop(2);
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
    const { data, error } = this.state;

    return (
      <React.Fragment>
        <ScrollView>
          <View style={styles.root}>
            <View style={styles.fieldWrapper}>
              <Text>Nama kamu</Text>
              <TextInput
                style={styles.field}
                value={data && (data.namaLengkap || '')}
                editable={false}
              />
            </View>
            <View style={styles.fieldWrapper}>
              <Text>No. Hp/Telepon</Text>
              <TextInput
                style={styles.field}
                value={data && (data.telepon || '')}
                onChangeText={this.handleChangeInput('telepon')}
              />
            </View>
            <View style={styles.fieldWrapper}>
              <Text>Alamat kamu</Text>
              <TextInput
                style={styles.field}
                value={data && (data.alamatLengkap || '')}
                onChangeText={this.handleChangeInput('alamatLengkap')}
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
                date={data.tanggalPesanan}
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
                date={data.jamPesanan}
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
            <View style={styles.fieldWrapper}>
              <Text>Jumlah Orang</Text>
              <TextInput
                style={styles.field}
                keyboardType="numeric"
                value={data.jumlahOrang}
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
                value={data.informasiTambahan}
                onChangeText={this.handleChangeInput('informasiTambahan')}
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
              {data.nama}
            </Text>
            <Text>{`MUA: ${data.namaLengkap}`}</Text>
            {/* <Text>{`Jenis Makeup: ${data.jenisMakeup}`}</Text> */}
            <Text>{`Layanan: ${data.layanan}`}</Text>
            <Text>{`Lama Pengerjaan: ${data.lamaPengerjaan} menit`}</Text>
            <Text>{`Harga: Rp ${data.harga}`}</Text>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#ccc',
                marginVertical: 8,
              }}
            />
            <Text>{`Jumlah orang: ${data.jumlahOrang}`}</Text>
            <Text>
              {`Estimasi pengerjaan: ${this.calcEstimasiPengerjaan(
                data.jumlahOrang,
                data.lamaPengerjaan,
              )} menit`}
            </Text>
            <Text>
              {`Total harga: Rp ${this.caclTotalHarga(
                data.jumlahOrang,
                data.harga,
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
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                  Simpan
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

export default RescheduleScreen;
