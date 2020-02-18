import React from 'react';
import { createStackNavigator } from 'react-navigation'
import SearchScreen from '../components/Search/SearchScreen.js';
import SearchResults from '../components/Search/SearchResults.js';
import CourseView from '../components/Courses/CourseView';
import SectionView from '../components/Courses/SectionView';

export default StackNavigator = createStackNavigator({
    SearchScreen,
    SearchResults,
    CourseView,
    SectionView
});

StackNavigator.navigationOptions = {header:null}
