import React, {useState, useEffect} from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import SemesterSelector from '../components/SemesterSelector';
import Swiper from 'react-native-swiper';
import api_links from '../constants/API';
import ExploreSubjects from '../components/Explore/ExploreSubjects';
import ExploreSchools from '../components/Explore/ExploreSchools';
import ExploreCourses from '../components/Explore/ExploreCourses';

var async = require('async');

const START_TILE = 1;
const titles = [
    'Explore Schools',
    'Explore Subjects',
    'Explore Courses',
];

/*
export default class ExploreScreen extends React.Component {
    constructor(props) {
        super();
        this.state = {
            data: [],
        };
    }

    _changeTest(event) {
        console.log("Change!");
        console.log(event);
    }

    componentWillMount() { // make API call to get subjects
        async.parallel({
            recent: async.reflect(callback => {
                fetch(api_base + '/current_term')
                .then(resp => resp.json())
                .then(res => callback(null, res))
                .catch(err => callback(err, null));
            }),
            terms: async.reflect(callback => {
                fetch(api_base + '/all_terms')
                .then(resp => resp.json())
                .then(res => callback(null, res))
                .catch(err => callback(err, null));
            }),
        }, (err, data) => {
            // console.log(data.terms.value.terms.map(term => {
            //     return {
            //         value: term._id,
            //         label: term.name
            //     }
            // }));
            this.setState({
                terms: data.terms.value.terms,
                recent: data.recent.value.term,
            });
        });
    }
//
    render() {
        if(!this.state.recent) return (<ScrollView><Text>Loading...</Text></ScrollView>)
        else return (
            <ScrollView style={styles.container}>
                <Text>Done!</Text>
            </ScrollView>
        );
    }
}
*/

export default function ExploreScreen(props) {
    const [semesterID, setSemesterID] = useState("0000");

    let setTitle = index => { // Not currently working.
        let newTitle = titles[index];
        ExploreScreen.navigationOptions = {
            title: newTitle ? newTitle : 'Explore',
        };
    }

    return (
        <View style={styles.container}>
            <SemesterSelector
                setSemesterID={setSemesterID}/>
            <View style={styles.container}>
                <Swiper style={styles.swiper}
                        showsPagination={false}
                        index={START_TILE}
                        onIndexChanged={index => setTitle(index)}>
                    <View style={styles.pane}>
                        <ExploreSchools semesterID={semesterID}/>
                    </View>
                    <View style={styles.pane}>
                        <ExploreSubjects semesterID={semesterID}/>
                    </View>
                    <View style={styles.pane}>
                        <ExploreCourses semesterID={semesterID}/>
                    </View>
                </Swiper>
            </View>
        </View>
    );
}

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
  }
});
