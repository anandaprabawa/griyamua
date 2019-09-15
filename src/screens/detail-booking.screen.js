import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

class DetailBooking extends React.Component {
  static navigationOptions = {
    title: 'Detail Pemesanan',
  };

  render() {
    const pesanan = this.props.navigation.getParam('pesanan');

    return (
      <ScrollView style={styles.root}>
        <View style={styles.fieldWrapper}>
          <Text style={styles.label}>Nama pesanan</Text>
          <Text style={styles.data}>{pesanan.item.nama}</Text>
        </View>
        <View style={styles.fieldWrapper}>
          <Text style={styles.label}>Nama yang memesan</Text>
          <Text style={styles.data}>{pesanan.pemesan.name}</Text>
        </View>
        <View style={styles.fieldWrapper}>
          <Text style={styles.label}>Alamat</Text>
          <Text style={styles.data}>{pesanan.alamat}</Text>
        </View>
        <View style={styles.fieldWrapper}>
          <Text style={styles.label}>Jenis Makeup</Text>
          <Text style={styles.data}>{pesanan.item.jenisMakeup}</Text>
        </View>
        <View style={styles.fieldWrapper}>
          <Text style={styles.label}>Produk Makeup</Text>
          <Text style={styles.data}>MakeOver</Text>
        </View>
        <View style={styles.fieldWrapper}>
          <Text style={styles.label}>MUA</Text>
          <Text style={styles.data}>{pesanan.mua.name}</Text>
        </View>
        <View style={styles.fieldWrapper}>
          <Text style={styles.label}>Tanggal</Text>
          <Text style={styles.data}>{pesanan.tanggal}</Text>
        </View>
        <View style={styles.fieldWrapper}>
          <Text style={styles.label}>Jam</Text>
          <Text style={styles.data}>{pesanan.jam}</Text>
        </View>
        <View style={styles.fieldWrapper}>
          <Text style={styles.label}>Jumlah Orang</Text>
          <Text style={styles.data}>{pesanan.jumlahOrang}</Text>
        </View>
        <View style={styles.fieldWrapper}>
          <Text style={styles.label}>Total Harga</Text>
          <Text style={styles.data}>
            {pesanan.item.harga * pesanan.jumlahOrang}
          </Text>
        </View>
        <View style={styles.fieldWrapper}>
          <Text style={styles.label}>Informasi Tambahan</Text>
          <Text style={styles.data}>{pesanan.infoTambahan}</Text>
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
