import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Agenda } from 'react-native-calendars';
import firebase from 'react-native-firebase';
import { format, getHours, getMinutes } from 'date-fns';
import { theme } from '../theme';

const Card = ({ item, navigation }) => {
  const calcJam = () => {
    return `${getHours(item.tanggalPesanan.toDate())}:${getMinutes(
      item.tanggalPesanan.toDate(),
    )} - ${getHours(item.akhirTanggalPesanan.toDate())}:${getMinutes(
      item.akhirTanggalPesanan.toDate(),
    )}`;
  };

  const handleClickJadwal = () => {
    navigation.navigate('DetailBookingOnMua', {
      data: item,
      fromBooking: true,
    });
  };

  return (
    <TouchableOpacity onPress={handleClickJadwal}>
      <View style={styles.cardWrapper}>
        <View style={styles.cardRoot}>
          <Text style={styles.cardTitle}>{item.nama}</Text>
          <Text style={styles.cardTime}>{calcJam()}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

class ScheduleScreen extends React.Component {
  static navigationOptions = {
    title: 'Jadwal',
  };

  state = {
    mua: this.props.navigation.getParam('mua'),
    data: null,
    selectedDate: new Date(),
  };

  componentDidMount() {
    const { mua } = this.state;
    firebase
      .firestore()
      .collection('pesanan')
      .where('muaId', '==', mua.uid)
      .onSnapshot(snapshot => {
        const docs = [];
        snapshot.forEach(doc => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        const newData = docs.reduce((prev, curr) => {
          const currentDate = format(
            curr.tanggalPesanan.toDate(),
            'yyyy-MM-dd',
          );
          return {
            ...prev,
            [currentDate]: prev[currentDate]
              ? [...prev[currentDate], curr]
              : [curr],
          };
        }, {});

        const filterStatus = Object.keys(newData).reduce((prev, curr) => {
          const theData = newData[curr];
          const filtered = theData.filter(k => k.status === 2);
          if (filtered.length === 0) {
            return { ...prev };
          }
          return { ...prev, [curr]: filtered };
        }, {});

        const filterTimeData = Object.keys(filterStatus).reduce(
          (prev, curr) => {
            const filter = filterStatus[curr].sort((a, b) =>
              a.tanggalPesanan.toDate() > b.tanggalPesanan.toDate() ? 1 : -1,
            );
            return { ...prev, [curr]: filter };
          },
          {},
        );
        this.setState({ data: filterTimeData });
      });
  }

  render() {
    const { data, selectedDate } = this.state;
    const { navigation } = this.props;

    return (
      <Agenda
        items={data}
        selected={selectedDate}
        rowHasChanged={(r1, r2) => {
          return r1.id !== r2.id;
        }}
        renderItem={item => {
          return <Card item={item} navigation={navigation} />;
        }}
        // specify how each date should be rendered. day can be undefined if the item is not first in that day.
        // renderDay={(day, item) => {
        //   return <View />;
        // }}
        // // specify how empty date content with no items should be rendered
        renderEmptyDate={() => {
          return <View />;
        }}
        // // specify how agenda knob should look like
        // renderKnob={() => {
        //   return <View />;
        // }}
        // // specify what should be rendered instead of ActivityIndicator
        renderEmptyData={() => {
          return (
            <Text style={{ padding: 16, fontSize: 16 }}>Tidak ada jadwal</Text>
          );
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginVertical: 16,
  },
  cardWrapper: {
    paddingBottom: 0,
  },
  cardRoot: {
    backgroundColor: theme.colors.primary,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardTime: {
    color: '#fff',
  },
});

export default ScheduleScreen;
