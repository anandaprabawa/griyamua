import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { format } from 'date-fns';
import firebase from 'react-native-firebase';
import { theme } from '../theme';

export const statusBooking = [
  'Ditolak',
  'Menunggu Konfirmasi',
  'Terkonfirmasi',
  'Dibatalkan',
];

class DetailBooking extends React.Component {
  static navigationOptions = {
    title: 'Detail Pesanan',
  };

  constructor(props) {
    super(props);
    this.state = {
      data: props.navigation.getParam('data'),
      fromBooking: props.navigation.getParam('fromBooking'),
    };
  }

  getTanggalBooking = () => {
    const { data, fromBooking } = this.state;
    const date = fromBooking
      ? data.tanggalPesanan.toDate()
      : data.tanggalPesanan;
    return format(date, 'dd MMMM yyyy - HH:mm');
  };

  getSelesaiTanggalBooking = () => {
    const { data, fromBooking } = this.state;
    const date = fromBooking
      ? data.akhirTanggalPesanan.toDate()
      : data.akhirTanggalPesanan;
    return format(date, 'dd MMMM yyyy - HH:mm');
  };

  calcTotalHarga = () => {
    const { data } = this.state;
    return data.jumlahOrang * data.harga;
  };

  handleBatal = async () => {
    const { data } = this.state;
    await firebase
      .firestore()
      .collection('pesanan')
      .doc(data.id)
      .update({ status: 3 });
    this.setState(prev => ({ data: { ...prev.data, status: 3 } }));
  };

  render() {
    const { data, fromBooking } = this.state;
    const { navigation } = this.props;

    return (
      <ScrollView style={styles.root}>
        <View style={styles.fieldWrapper}>
          <Text style={styles.label}>Nama pesanan</Text>
          <Text style={styles.data}>{data.nama}</Text>
        </View>
        <View style={styles.fieldWrapper}>
          <Text style={styles.label}>Nama yang memesan</Text>
          <Text style={styles.data}>{data.namaPemesan}</Text>
        </View>
        <View style={styles.fieldWrapper}>
          <Text style={styles.label}>Alamat</Text>
          <Text style={styles.data}>{data.alamatLengkap}</Text>
        </View>
        <View style={styles.fieldWrapper}>
          <Text style={styles.label}>Jenis Makeup</Text>
          <Text style={styles.data}>{data.jenisMakeup}</Text>
        </View>
        <View style={styles.fieldWrapper}>
          <Text style={styles.label}>Produk Makeup</Text>
          <Text style={styles.data}>{data.produkMakeup}</Text>
        </View>
        <View style={styles.fieldWrapper}>
          <Text style={styles.label}>MUA</Text>
          <Text style={styles.data}>{data.namaMua}</Text>
        </View>
        <View style={styles.fieldWrapper}>
          <Text style={styles.label}>Tanggal Booking</Text>
          <Text style={styles.data}>{this.getTanggalBooking()}</Text>
        </View>
        <View style={styles.fieldWrapper}>
          <Text style={styles.label}>Selesai Booking</Text>
          <Text style={styles.data}>{this.getSelesaiTanggalBooking()}</Text>
        </View>
        <View style={styles.fieldWrapper}>
          <Text style={styles.label}>Jumlah Orang</Text>
          <Text style={styles.data}>{data.jumlahOrang}</Text>
        </View>
        <View style={styles.fieldWrapper}>
          <Text style={styles.label}>Harga</Text>
          <Text style={styles.data}>{`Rp ${data.harga}`}</Text>
        </View>
        <View style={styles.fieldWrapper}>
          <Text style={styles.label}>Total Harga</Text>
          <Text style={styles.data}>{`Rp ${this.calcTotalHarga()}`}</Text>
        </View>
        <View style={styles.fieldWrapper}>
          <Text style={styles.label}>Informasi Tambahan</Text>
          <Text style={styles.data}>
            {data.informasiTambahan ? data.informasiTambahan : '-'}
          </Text>
        </View>
        <View style={styles.fieldWrapper}>
          <Text style={styles.label}>Status</Text>
          <Text style={[styles.data, styles.status(data.status)]}>
            {statusBooking[data.status]}
          </Text>
        </View>
        {data.status === 2 && (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Reschedule', { data, fromBooking })
            }
          >
            <View
              style={{
                backgroundColor: theme.colors.primary,
                height: 48,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 16,
                marginTop: 24,
              }}
            >
              <Text style={{ color: '#fff', fontSize: 16 }}>
                Penjadwalan Ulang
              </Text>
            </View>
          </TouchableOpacity>
        )}
        {(data.status === 1 || data.status === 2) && (
          <TouchableOpacity onPress={this.handleBatal}>
            <View
              style={{
                backgroundColor: theme.colors.primary,
                height: 48,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 32,
              }}
            >
              <Text style={{ color: '#fff', fontSize: 16 }}>
                Batalkan Pesanan
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </ScrollView>
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
  label: {
    fontWeight: 'bold',
  },
  data: {
    fontSize: 16,
  },
  status: c => ({
    color:
      (c === 0 && 'red') ||
      (c === 1 && 'orange') ||
      (c === 2 && 'green') ||
      (c === 3 && 'red'),
    borderWidth: 1,
    borderColor:
      (c === 0 && 'red') ||
      (c === 1 && 'orange') ||
      (c === 2 && 'green') ||
      (c === 3 && 'red'),
    padding: 8,
    marginTop: 4,
    borderRadius: 8,
  }),
});

export default DetailBooking;
