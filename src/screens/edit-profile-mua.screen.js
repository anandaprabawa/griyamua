import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import MultiSelect from 'react-native-sectioned-multi-select';
import { theme } from '../theme';
// import { drugStoreProduct, highEndProduct } from './search.screen';
import { jMakeup, pMakeup } from './daftar-mua3.screen';

const jenisMakeup = jMakeup.map(name => ({ name }));
const produkMakeup = pMakeup.map(name => ({ name }));

class EditProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Edit Profil',
  };

  handleSave = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.root}>
          <View style={styles.fieldWrapper}>
            <Text>Nama</Text>
            <TextInput style={styles.field} />
          </View>
          <View style={styles.fieldWrapper}>
            <Text>Username</Text>
            <TextInput style={styles.field} />
          </View>
          <View style={styles.fieldWrapper}>
            <Text>Jenis Makeup</Text>
            <View style={[styles.field, { paddingHorizontal: 4 }]}>
              <MultiSelect
                items={jenisMakeup}
                uniqueKey="name"
                // selectedItems={null}
                onSelectedItemsChange={() => null}
                showCancelButton
              />
            </View>
          </View>
          <View style={styles.fieldWrapper}>
            <Text>Jenis Produk</Text>
            <View style={[styles.field, { paddingHorizontal: 4 }]}>
              <MultiSelect
                items={produkMakeup}
                uniqueKey="name"
                // selectedItems={produkMakeup[0]}
                onSelectedItemsChange={() => null}
                showCancelButton
              />
            </View>
          </View>
          <View style={styles.fieldWrapper}>
            <Text>Alamat</Text>
            <TextInput
              style={styles.field}
              multiline
              onChangeText={val => this.handleInput('alamat', val)}
            />
          </View>
          <View style={styles.fieldWrapper}>
            <Text>Kontak</Text>
            <TextInput
              style={styles.field}
              placeholder="Whatsapp"
              onChangeText={val => this.handleInput('wa', val)}
            />
            <TextInput
              style={styles.field}
              placeholder="Instagram"
              onChangeText={val => this.handleInput('ig', val)}
            />
          </View>
          <TouchableOpacity onPress={this.handleSave}>
            <View style={styles.btnSave}>
              <Text style={styles.btnSaveText}>Simpan</Text>
            </View>
          </TouchableOpacity>
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
  field: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    paddingHorizontal: 16,
    marginVertical: 4,
  },
  btnSave: {
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    borderRadius: 4,
  },
  btnSaveText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default EditProfileScreen;
