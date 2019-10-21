import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { Calendar, Agenda } from 'react-native-calendars';
import { theme } from '../theme';
import firebase from 'react-native-firebase';

const Card = ({ item }) => (
  <View style={styles.cardWrapper}>
    <View style={styles.cardRoot}>
      <Text style={styles.cardTitle}>{item.item.nama}</Text>
      <Text style={styles.cardTime}>{item.jam}</Text>
    </View>
  </View>
);

class ScheduleScreen extends React.Component {
  static navigationOptions = {
    title: 'Jadwal',
  };

  state = {
    data: {},
  };

  // componentDidMount() {
  //   const user = this.props.navigation.getParam('user');
  //   const loginUser = firebase.auth().currentUser;

  //   firebase
  //     .firestore()
  //     .collection('pesanan')
  //     .where('mua.uid', '==', user ? user.uid : loginUser.uid)
  //     .onSnapshot(snapshot => {
  //       const temp = {};
  //       snapshot.forEach(snap => {
  //         const d = snap.data();
  //         temp[d.tanggal] = [{ ...d }];
  //       });
  //       this.setState({ data: temp });
  //     });
  // }

  render() {
    return (
      // <ScrollView>
      //   <Calendar
      //     theme={{
      //       selectedDayBackgroundColor: theme.colors.primary,
      //       selectedDayTextColor: '#ffffff',
      //       todayTextColor: theme.colors.primary,
      //       dotColor: theme.colors.primary,
      //       arrowColor: theme.colors.primary,
      //     }}
      //     markedDates={this.state.data}
      //   />
      //   <View style={styles.divider} />
      //   <View style={styles.cardWrapper}>
      //     <View style={styles.cardRoot}>
      //       <Text style={styles.cardTitle}>Judul pemesanan disini</Text>
      //       <Text style={styles.cardTime}>14.00 - 16.00 WITA</Text>
      //     </View>
      //   </View>
      // </ScrollView>
      <Agenda
        items={this.state.data}
        selected={new Date()}
        rowHasChanged={(r1, r2) => {
          return r1.text !== r2.text;
        }}
        renderItem={(item, firstItemInDay) => {
          return <Card item={item} />;
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
    paddingBottom: 16,
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
