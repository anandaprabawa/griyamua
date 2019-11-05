import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Picker,
  TouchableOpacity,
} from 'react-native';
import { Formik } from 'formik';
import firebase from 'react-native-firebase';
import { theme } from '../theme';
import { jMakeup, pMakeup } from './daftar-mua3.screen';

class CreatePricelistScreen extends React.Component {
  static navigationOptions = {
    title: 'Buat Daftar Harga',
  };

  handleSubmit = async (values, actions) => {
    const { navigation } = this.props;

    const user = firebase.auth().currentUser;
    await firebase
      .firestore()
      .collection('daftar-harga')
      .add({ ...values, ownerId: user.uid });
    actions.setSubmitting(false);
    navigation.pop(2);
  };

  render() {
    return (
      <Formik
        initialValues={{
          nama: '',
          jenisMakeup: jMakeup[0],
          produkMakeup: pMakeup[0],
          layanan: '',
          harga: '',
          lamaPengerjaan: '',
        }}
        onSubmit={this.handleSubmit}
      >
        {({
          handleSubmit,
          values,
          handleChange,
          handleBlur,
          setFieldValue,
        }) => (
          <React.Fragment>
            <ScrollView>
              <View style={styles.formRoot}>
                <View style={styles.formInputWrapper}>
                  <Text style={styles.label}>Nama Makeup</Text>
                  <TextInput
                    style={[
                      styles.formInputMargin,
                      styles.formInputPadding,
                      styles.inputBorder,
                    ]}
                    placeholder="contoh: Daily Makeup"
                    value={values.nama}
                    onChangeText={handleChange('nama')}
                    onBlur={handleBlur('nama')}
                  />
                </View>
                <View style={styles.formInputWrapper}>
                  <Text style={styles.label}>Jenis Makeup</Text>
                  <View
                    style={[styles.formPickerInputWrapper, styles.inputBorder]}
                  >
                    <Picker
                      selectedValue={values.jenisMakeup}
                      onValueChange={val => setFieldValue('jenisMakeup', val)}
                    >
                      {jMakeup.map(jm => (
                        <Picker.Item key={jm} label={jm} value={jm} />
                      ))}
                    </Picker>
                  </View>
                </View>
                <View style={styles.formInputWrapper}>
                  <Text style={styles.label}>Produk Makeup</Text>
                  <View
                    style={[styles.formPickerInputWrapper, styles.inputBorder]}
                  >
                    <Picker
                      selectedValue={values.produkMakeup}
                      onValueChange={val => setFieldValue('produkMakeup', val)}
                    >
                      {pMakeup.map(pm => (
                        <Picker.Item key={pm} label={pm} value={pm} />
                      ))}
                    </Picker>
                  </View>
                </View>
                <View style={styles.formInputWrapper}>
                  <Text style={styles.label}>Lama Pengerjaan</Text>
                  <View
                    style={[
                      styles.inputBorder,
                      styles.inputMenitWrapper,
                      styles.formInputMargin,
                    ]}
                  >
                    <TextInput
                      style={[styles.inputMenit, styles.formInputPadding]}
                      placeholder="contoh: 60"
                      value={values.lamaPengerjaan}
                      onChangeText={handleChange('lamaPengerjaan')}
                      onBlur={handleBlur('lamaPengerjaan')}
                    />
                    <View style={styles.inputMenitTextWrapper}>
                      <Text style={styles.inputMenitText}>menit</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.formInputWrapper}>
                  <Text style={styles.label}>Harga</Text>
                  <TextInput
                    style={[
                      styles.formInputMargin,
                      styles.formInputPadding,
                      styles.inputBorder,
                    ]}
                    placeholder="contoh: 100000"
                    value={values.harga}
                    keyboardType="numeric"
                    onChangeText={handleChange('harga')}
                    onBlur={handleBlur('harga')}
                  />
                </View>
                <View style={styles.formInputWrapper}>
                  <Text style={styles.label}>Penjelasan (optional)</Text>
                  <TextInput
                    style={[
                      styles.formInputMargin,
                      styles.formInputPadding,
                      styles.inputBorder,
                    ]}
                    placeholder="contoh: Hairdo & Makeup"
                    value={values.layanan}
                    onChangeText={handleChange('layanan')}
                    onBlur={handleBlur('layanan')}
                  />
                </View>
              </View>
            </ScrollView>
            <TouchableOpacity onPress={handleSubmit}>
              <View style={styles.buttonWrapper}>
                <Text style={styles.buttonText}>Buat</Text>
              </View>
            </TouchableOpacity>
          </React.Fragment>
        )}
      </Formik>
    );
  }
}

const styles = StyleSheet.create({
  formRoot: {
    padding: 16,
  },
  label: {
    fontSize: 16,
  },
  formInputWrapper: {
    marginBottom: 16,
  },
  formInputMargin: {
    marginVertical: 4,
  },
  formInputPadding: {
    paddingHorizontal: 16,
  },
  formPickerInputWrapper: {
    marginVertical: 4,
    paddingHorizontal: 8,
  },
  inputBorder: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ccc',
    borderRadius: 4,
  },
  buttonWrapper: {
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
  },
  buttonText: {
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  inputMenitWrapper: {
    flexDirection: 'row',
  },
  inputMenit: {
    flex: 1,
  },
  inputMenitTextWrapper: {
    backgroundColor: '#ccc',
    paddingHorizontal: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputMenitText: {
    textTransform: 'uppercase',
    fontSize: 12,
  },
});

export default CreatePricelistScreen;
