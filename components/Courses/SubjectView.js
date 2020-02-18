import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { api_links } from '../../constants/API';
import CommonDisplayTab from './CommonDisplayTab';

export default class SubjectView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            semesterID: props.navigation.getParam('semesterID'),
            subject: props.navigation.getParam('subject'),
            courses: [],
        }
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: `${navigation.getParam('subject').name}`,
        }
    }

    componentWillMount() {
        let get = async () => {
            let resp = await fetch(`${api_links.api_base}/search?term_id=${this.state.semesterID}&subject=${this.state.subject.subject}&per=1000&scratch_duplicates=1`);
            let parsed = await resp.json();
            this.setState({
                courses: parsed.data,
            })
        }
        get();
    }

    generateCourseOpener(course) {
        return () => {
            this.props.navigation.push('CourseView', {
                semesterID: this.state.semesterID,
                subject: course.subject,
                catalog_number: course.catalog_number,
            });
        }
    }

    displayCourse(course) {
        return (
            <TouchableOpacity key={course._id} onPress={this.generateCourseOpener(course)}>
                <CommonDisplayTab type={"course"} course={course}/>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.scroller}>
                    {this.state.courses.map(course => this.displayCourse(course))}
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
