import React from 'react';
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation';
import { bottomBarConfig } from './bottom-bar-config';
import SplashScreen from './screens/splash.screen';
import ChooseAuthScreen from './screens/choose-auth.screen';
import LoginScreen from './screens/login.screen';
import SignupScreen from './screens/signup.screen';
import HomeScreen from './screens/home.screen';
import SearchScreen from './screens/search.screen';
import BookingScreen from './screens/booking.screen';
import AccountScreen from './screens/account.screen';
import PricelistScreen from './screens/pricelist.screen';
import GalleryScreen from './screens/gallery.screen';
import CreatePricelistScreen from './screens/create-pricelist.screen';
import ReviewScreen from './screens/review.screen';
import ScheduleScreen from './screens/schedule.screen';
import DetailScreen from './screens/detail-booking.screen';
import { theme } from './theme';
import EditProfileScreen from './screens/edit-profile.screen';
import Logout from './components/logout.component';
import SearchResultScreen from './screens/search-result.screen';
import BeriUlasanScreen from './screens/beri-ulasan.screen';
import MainMua from './mua-routes';
import PesanScreen from './screens/pesan.screen';

const AuthNavigator = createStackNavigator({
  ChooseAuth: ChooseAuthScreen,
  Login: LoginScreen,
  Signup: SignupScreen,
});

const HomeStack = createStackNavigator({
  IndexHome: HomeScreen,
});

const SearchAccountTabs = createMaterialTopTabNavigator(
  {
    ResultProfile: AccountScreen,
    ResultSchedule: ScheduleScreen,
    ResultPricelist: PricelistScreen,
    ResultGallery: GalleryScreen,
    ResultReview: ReviewScreen,
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerTitle: 'Akun MUA',
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
});

const BookingStack = createStackNavigator({
  IndexBooking: BookingScreen,
  DetailBooking: DetailScreen,
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

export default createAppContainer(InitialNavigator);
