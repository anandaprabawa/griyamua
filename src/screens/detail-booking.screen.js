import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { theme } from '../theme';

class DetailBooking extends React.Component {
  static navigationOptions = {
    title: 'Detail Pesanan',
  };

  render() {
    // const pesanan = this.props.navigation.getParam('pesanan');

    return (
      <ScrollView style={styles.root}>
        <View style={styles.fieldWrapper}>
          <Text style={styles.label}>Nama pesanan</Text>
          <Text style={styles.data}>Makeup Biasa</Text>
        </View>
        <View style={styles.fieldWrapper}>
          <Text style={styles.label}>Nama yang memesan</Text>
          <Text style={styles.data}>Ratih Ardyantari</Text>
        </View>
        <View style={styles.fieldWrapper}>
          <Text style={styles.label}>Alamat</Text>
          <Text style={styles.data}>Jalan tukad badung</Text>
        </View>
        <View style={styles.fieldWrapper}>
          <Text style={styles.label}>Jenis Makeup</Text>
          <Text style={styles.data}>Flawless</Text>
        </View>
        <View style={styles.fieldWrapper}>
          <Text style={styles.label}>Produk Makeup</Text>
          <Text style={styles.data}>MakeOver</Text>
        </View>
        <View style={styles.fieldWrapper}>
          <Text style={styles.label}>MUA</Text>
          <Text style={styles.data}>Eldy Pramana</Text>
        </View>
        <View style={styles.fieldWrapper}>
          <Text style={styles.label}>Tanggal Booking</Text>
          <Text style={styles.data}>10 November 2019</Text>
        </View>
        <View style={styles.fieldWrapper}>
          <Text style={styles.label}>Jam</Text>
          <Text style={styles.data}>16.00</Text>
        </View>
        <View style={styles.fieldWrapper}>
          <Text style={styles.label}>Jumlah Orang</Text>
          <Text style={styles.data}>1</Text>
        </View>
        <View style={styles.fieldWrapper}>
          <Text style={styles.label}>Harga</Text>
          <Text style={styles.data}>Rp 300.000</Text>
        </View>
        <View style={styles.fieldWrapper}>
          <Text style={styles.label}>Total Harga</Text>
          <Text style={styles.data}>Rp 300.000</Text>
        </View>
        <View style={styles.fieldWrapper}>
          <Text style={styles.label}>Informasi Tambahan</Text>
          <Text style={styles.data}>-</Text>
        </View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Reschedule')}
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
        <View
          style={{
            backgroundColor: theme.colors.primary,
            height: 48,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 32,
          }}
        >
          <Text style={{ color: '#fff', fontSize: 16 }}>Batalkan Pesanan</Text>
        </View>
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
});

export default DetailBooking;
