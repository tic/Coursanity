import React, {useState, useEffect} from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import SemesterSelector from '../components/SemesterSelector';
import Swiper from 'react-native-swiper';
import api_links from '../constants/API';

var async = require('async');


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

    return (
        <View style={styles.container}>
            <SemesterSelector
                setSemesterID={setSemesterID}/>
            <View style={styles.container}>
                <Swiper style={styles.swiper}
                        showsPagination={false}
                        index={1}>
                    <View style={styles.pane}>
                        <Text>Explore Schools</Text>
                    </View>
                    <View style={styles.pane}>
                        <Text>Explore Subjects</Text>
                    </View>
                    <View style={styles.pane}>
                        <Text>Explore Courses</Text>
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
