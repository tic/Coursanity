import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { api_links } from '../../constants/API.js';

export default class CourseView extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {

    }

    render() {
        return (
            <View>
                <Text>Blank course view</Text>
            </View>
        );
    }
}
