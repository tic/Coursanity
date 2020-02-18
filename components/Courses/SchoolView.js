import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { api_links } from '../../constants/API';
import CommonDisplayTab from './CommonDisplayTab';

export default class SubjectView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            semesterID: props.navigation.getParam('semesterID'),
            school: props.navigation.getParam('school'),
            subjects: [],
        }
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: `${navigation.getParam('name')}`,
        }
    }

    componentWillMount() {
        let get = async () => {
            let resp = await fetch(`${api_links.api_base}/subjects`);
            let subjects = await resp.json();
            this.setState({
                subjects: subjects.filter(subject => subject.school === this.state.school),
            });
        }
        get();
    }

    generateSubjectOpener(subject) {
        return () => {
            this.props.navigation.push('SubjectView', {
                semesterID: this.state.semesterID,
                subject,
            });
        }
    }

    displaySubject(subject) {
        return (
            <TouchableOpacity key={subject._id} onPress={this.generateSubjectOpener(subject)}>
                <CommonDisplayTab type={"subject"} subject={subject}/>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.scroller}>
                    {this.state.subjects.map(subject => this.displaySubject(subject))}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },
    scroller: {
        height: "100%",
    }
})
