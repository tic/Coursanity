import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { api_links } from '../../constants/API.js';

export default class CourseView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            semesterID: props.semesterID,
            subject: props.navigation.getParam('subject'),
            catalog_number: props.navigation.getParam('catalog_number'),
            courses: [],
        }
    }

    static navigationOptions = ({navigation}) => {
        const { params } = navigation.state;
        console.log(`${params.subject}${params.catalog_number}`);
        return {
            title: `${params.subject}${params.catalog_number}`,
        }
    }

    componentWillMount() {
        let get = async () => {
            let resp = await fetch(`${api_links.api_base}/search?term_id=${this.state.semesterID}&per=250&subject=${this.state.subject}&catalog_number=${this.state.catalog_number}`);
            let parsed = await resp.json();
            // console.log(parsed.data);
            this.setState({
                courses: parsed.data
            });
        }
        get();
    }

    render() {
        return (
            <View>
                <Text>Blank course view</Text>
            </View>
        );
    }
}
