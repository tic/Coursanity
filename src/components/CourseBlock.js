// http://scheduler.gifit.io/api/search?term_id=1198&subject=CS&catalog_number=2150&per=25&page=0

import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

export default class CourseBlock extends React.Component {
    constructor() {
        super();
        this.state = {
            subject: null,
            catalog_number: null,
        }
    }

    // Make API Call
    componentWillMount() {
        fetch('http://scheduler.gifit.io/api/search?term_id=1198&subject=CS&catalog_number=2150&per=25&page=0')
        .then(resp => resp.json())
        .then(res => {
            this.setState({
                subject: res.data[0].subject,
                catalog_number: res.data[0].catalog_number,
            });
        });
    }

    render() {
        if(!this.state.subject) return (<View/>);
        else return (
            <View>
                <Text style={component_styles.course_header}>
                    {this.state.subject} {this.state.catalog_number}
                </Text>
            </View>
        );
    }
}

const component_styles = StyleSheet.create({
    course_header: {
        color: 'white',
        backgroundColor: Colors.uvaOrange,
        padding: 15,
        borderRadius: 5,
    },
});
