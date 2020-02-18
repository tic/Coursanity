import React, {useState, useEffect} from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import SemesterSelector from '../components/SemesterSelector';
import Swiper from 'react-native-swiper';
import { api_links } from '../constants/API';
import ExploreSubjects from '../components/Explore/ExploreSubjects';
import ExploreSchools from '../components/Explore/ExploreSchools';
import ExploreCourses from '../components/Explore/ExploreCourses';
import CourseView from '../components/Courses/CourseView';
import SectionView from '../components/Courses/SectionView';
import SubjectView from '../components/Courses/SubjectView';
import SchoolView from '../components/Courses/SchoolView';

const START_TILE = 1;
const titles = [
    'Explore Schools',
    'Explore Subjects',
    'Explore Courses',
];

function ExploreScreen(props) {
    const [semesterID, setSemesterID] = useState("0000");

    let setTitle = index => {
        let newTitle = titles[index];
        props.navigation.setParams({Title: newTitle});
    }

    return (
        <View style={styles.container}>
            <SemesterSelector
                setSemesterID={setSemesterID}/>
            <View style={styles.container}>
                <Swiper style={styles.swiper}
                        showsPagination={true}
                        loop={false}
                        index={START_TILE}
                        onIndexChanged={index => setTitle(index)}>
                    <View style={styles.pane}>
                        <Text style={styles.titles}>Explore Schools</Text>
                        <ExploreSchools semesterID={semesterID}
                                        navigation={props.navigation}/>
                    </View>
                    <View style={styles.pane}>
                        <Text style={styles.titles}>Explore Subjects</Text>
                        <ExploreSubjects semesterID={semesterID}
                                         navigation={props.navigation}/>
                    </View>
                    <View style={styles.pane}>
                        <Text style={styles.titles}>Explore Courses</Text>
                        <ExploreCourses semesterID={semesterID}
                                        navigation={props.navigation}/>
                    </View>
                </Swiper>
            </View>
        </View>
    );
}

import { createStackNavigator } from 'react-navigation'

export default StackNavigator = createStackNavigator({
    ExploreScreen,
    CourseView,
    SectionView,
    SubjectView,
    SchoolView
});

StackNavigator.navigationOptions = {header:null}

ExploreScreen.navigationOptions = {
    title: 'Explore',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  pane: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
  },
  swiper: {
  },
  titles: {
      marginTop: 20,
      fontSize: 16,
  }
});
