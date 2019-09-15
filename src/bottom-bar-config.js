import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from './theme';

export const bottomBarConfig = {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Home') {
        iconName = `home${focused ? '' : '-outline'}`;
      } else if (routeName === 'Search') {
        iconName = 'magnify';
      } else if (routeName === 'Booking') {
        iconName = `book${focused ? '' : '-outline'}`;
      } else if (routeName === 'Account') {
        iconName = `account-circle${focused ? '' : '-outline'}`;
      }

      // You can return any component that you like here!
      return <Icon name={iconName} size={32} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: theme.colors.primary,
    inactiveTintColor: 'gray',
    showLabel: false,
  },
};
