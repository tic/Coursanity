import React from 'react';
import { createStackNavigator } from 'react-navigation'
import SearchScreen from '../components/Search/SearchScreen.js';
import SearchResults from '../components/Search/SearchResults.js';

export default StackNavigator = createStackNavigator({
    SearchScreen,
    SearchResults
});

StackNavigator.navigationOptions = {header:null}
