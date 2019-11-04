import React from 'react';
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import OneSignal from 'react-native-onesignal';
import { bottomBarConfig } from './bottom-bar-config';
import SplashScreen from './screens/splash.screen';
import ChooseAuthScreen from './screens/choose-auth.screen';
import LoginScreen from './screens/login.screen';
import SignupScreen from './screens/signup.screen';
import HomeScreen from './screens/home.screen';
import SearchScreen from './screens/search.screen';
import BookingScreen from './screens/booking.screen';
import AccountScreen from './screens/account.screen';
import AccountScreenResult from './screens/account-result.screen';
// import PricelistScreen from './screens/pricelist.screen';
import PricelistScreenResult from './screens/pricelist-result.screen';
// import GalleryScreen from './screens/gallery.screen';
import GalleryScreenResult from './screens/gallery-result.screen';
import CreatePricelistScreen from './screens/create-pricelist.screen';
import ReviewScreenResult from './screens/review-result.screen';
// import ScheduleScreen from './screens/schedule.screen';
import ScheduleScreenResult from './screens/schedule-result.screen';
import DetailScreen from './screens/detail-booking.screen';
import { theme } from './theme';
import EditProfileScreen from './screens/edit-profile.screen';
import Logout from './components/logout.component';
import SearchResultScreen from './screens/search-result.screen';
import BeriUlasanScreen from './screens/beri-ulasan.screen';
import MainMua from './mua-routes';
import PesanScreen from './screens/pesan.screen';
import LupaPassword from './screens/lupa-password.screen';
import ConfirmPassword from './screens/confirm-password.screen';
import ChooseDaftar from './screens/choose-daftar.screen';
import DaftarPelanggan from './screens/daftar-pelanggan.screen';
import DaftarPelanggan2 from './screens/daftar-pelanggan2.screen';
import DaftarMUA from './screens/daftar-mua.screen';
import DaftarMUA2 from './screens/daftar-mua2.screen';
import DaftarMUA3 from './screens/daftar-mua3.screen';
import RescheduleScreen from './screens/reschedule.screen';
import DetailBookingResult from './screens/detail-booking-result.screen';

const AuthNavigator = createStackNavigator({
  ChooseAuth: ChooseAuthScreen,
  ChooseDaftar,
  Login: LoginScreen,
  Signup: SignupScreen,
  LupaPassword,
  ConfirmPassword,
  DaftarPelanggan,
  DaftarPelanggan2,
  DaftarMUA,
  DaftarMUA2,
  DaftarMUA3,
});

const HomeStack = createStackNavigator({
  IndexHome: HomeScreen,
});

const SearchAccountTabs = createMaterialTopTabNavigator(
  {
    ResultProfile: AccountScreenResult,
    ResultSchedule: ScheduleScreenResult,
    ResultPricelist: PricelistScreenResult,
    ResultGallery: GalleryScreenResult,
    ResultReview: ReviewScreenResult,
  },
  {
    navigationOptions: () => ({
      headerTitle: 'MUA',
    }),
    lazy: true,
    tabBarOptions: {
      inactiveTintColor: '#000',
      activeTintColor: '#000',
      indicatorStyle: {
        backgroundColor: theme.colors.primary,
      },
      style: {
        backgroundColor: '#eee',
        elevation: 0,
      },
      scrollEnabled: true,
    },
  },
);

const SearchStack = createStackNavigator({
  IndexSearch: SearchScreen,
  SearchResult: SearchResultScreen,
  SearchResultAccount: SearchAccountTabs,
  BeriUlasan: BeriUlasanScreen,
  Pesan: PesanScreen,
  DetailBookingOnMua: DetailBookingResult,
});

const BookingStack = createStackNavigator({
  IndexBooking: BookingScreen,
  DetailBooking: DetailScreen,
  Reschedule: RescheduleScreen,
});

const AccountTabs = createMaterialTopTabNavigator(
  {
    Profile: AccountScreen,
    // Schedule: ScheduleScreen,
    // Pricelist: PricelistScreen,
    // Gallery: GalleryScreen,
    // Review: ReviewScreen,
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerTitle: 'Akun Saya',
      headerRight: <Logout navigation={navigation} />,
    }),
    lazy: true,
    tabBarOptions: {
      inactiveTintColor: '#000',
      activeTintColor: '#000',
      indicatorStyle: {
        backgroundColor: theme.colors.primary,
      },
      style: {
        backgroundColor: '#eee',
        elevation: 0,
      },
      scrollEnabled: true,
    },
  },
);

const AccountStack = createStackNavigator({
  IndexAccountTabs: AccountTabs,
  CreatePricelist: CreatePricelistScreen,
  EditProfile: EditProfileScreen,
  Reschedule: RescheduleScreen,
});

const MainNavigator = createBottomTabNavigator(
  {
    Home: HomeStack,
    Search: SearchStack,
    Booking: BookingStack,
    Account: AccountStack,
  },
  bottomBarConfig,
);

const AppNavigator = createSwitchNavigator({
  Auth: AuthNavigator,
  Main: MainNavigator,
  MainMua,
});

const InitialNavigator = createSwitchNavigator({
  Splash: SplashScreen,
  App: AppNavigator,
});

const AppNav = createAppContainer(InitialNavigator);

class App extends React.Component {
  constructor(props) {
    super(props);
    OneSignal.init('abe9a6d2-2a4c-49d6-b14d-cbd9ef6da1c9');
    OneSignal.addEventListener('ids', this.onIds);
    OneSignal.enableSound(true);
    OneSignal.inFocusDisplaying(2);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onIds = async device => {
    await AsyncStorage.setItem('@playerId', device.userId);
  };

  render() {
    return (
      <>
        <AppNav />
      </>
    );
  }
}

export default App;
