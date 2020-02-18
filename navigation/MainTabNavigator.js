import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import Colors from '../constants/Colors';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SearchScreen from '../screens/SearchIndex';
import SettingsScreen from '../screens/SettingsScreen';
import ExploreScreen from '../screens/ExploreScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const tabBarOptions = {
    activeTintColor: Colors.tabIconSelected,
}

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config,
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name='home'
    />
  ),
  tabBarOptions,
};

HomeStack.path = '';

const ExploreStack = createStackNavigator(
  {
    Links: ExploreScreen,
  },
  config
);

ExploreStack.navigationOptions = {
  tabBarLabel: 'Explore',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name='compass' />
  ),
  tabBarOptions,
};

ExploreStack.path = '';

const SearchStack = createStackNavigator(
  {
    Links: SearchScreen,
  },
  config
);

SearchStack.navigationOptions = {
  tabBarLabel: 'Search',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name='search' />
  ),
  tabBarOptions,
};

SearchStack.path = '';

const ProfileStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name='user' />
  ),
  tabBarOptions,
};

ProfileStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  ExploreStack,
  SearchStack,
});
tabNavigator.path = '';

export default tabNavigator;
