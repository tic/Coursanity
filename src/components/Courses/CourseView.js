import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { api_links } from '../../constants/API.js';

const WIDTH = Dimensions.get('screen').width;

export default class CourseView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            semesterID: props.navigation.getParam('semesterID'),
            subject: props.navigation.getParam('subject'),
            catalog_number: props.navigation.getParam('catalog_number'),
            courses: [],
        }
    }

    static navigationOptions = ({navigation}) => {
        const { params } = navigation.state;
        return {
            title: `${params.subject}${params.catalog_number}`,
        }
    }

    componentWillMount() {
        let get = async () => {
            let resp = await fetch(`${api_links.api_base}/search?term_id=${this.state.semesterID}&per=250&subject=${this.state.subject}&catalog_number=${this.state.catalog_number}`);
            let parsed = await resp.json();
            this.setState({
                courses: parsed.data
            });
        }
        get();
    }

    formatCourses() {
        return this.state.courses.map(course => {
            if(course.meetings.length > 0) {
                course.stringifiedMeetings = course.meetings.reduce((accum, meeting) => {
                    return `${accum}${meeting.days} ${meeting.start} - ${meeting.finish}`;
                }, ``);
            } else course.stringifiedMeetings = "N/A";

            if(course.instructors.length > 0) {
                let s = course.instructors.reduce((accum, instructor) => `${accum}${instructor} & `, ``);
                course.stringifiedInstructors = s.slice(0, -3);
            } else course.stringifiedInstructors = "N/A";

            return course;
        });
    }

    launchSectionView(course) {
        return () => {
            this.props.navigation.push('SectionView', {
                semesterID: this.state.semesterID,
                sis_id: course.sis_id,
                title: `${course.common_name} - ${course.section}`,
            });
        }
    }

    render() {
        if(this.state.courses.length > 0) return (
            <ScrollView style={styles.container}>
                <Text style={styles.courseTitle}>{this.state.courses[0].title}</Text>
                {
                    this.state.courses[0].topic.length > 0 ?
                        (<Text style={styles.courseTopic}>Topic: {this.state.courses[0].topic}</Text>)
                        : <View/>
                }
                <Text style={styles.courseDesc}>Description: {this.state.courses[0].desc}</Text>
                <Text>Sections offered</Text>
                <Text>Click on a section to see details</Text>
                <FlatList keyExtractor={item => item._id}
                    data={this.formatCourses()}
                    renderItem={({item}) => (
                        <TouchableOpacity
                                style={styles.row}
                                onPress={this.launchSectionView(item).bind(this)}>
                            <Text style={{...styles.cells, width: WIDTH * .1}}>{item.section}</Text>
                            <Text style={{...styles.cells, width: WIDTH * .3}}>{item.stringifiedInstructors}</Text>
                            <Text style={{...styles.cells, width: WIDTH * .35}}>{item.stringifiedMeetings}</Text>
                            <Text style={{...styles.cells, width: WIDTH * .25}}>{item.type}</Text>
                        </TouchableOpacity>
                    )}/>
                <Text>Grade data for this course</Text>
            </ScrollView>
        );
        return (<View/>);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        width: "100%",
        flexDirection: 'row',
    },
    cells: {
        textAlign: "center",
        padding: 3,
        paddingTop: 10,
        paddingBottom: 10
    },
    courseTitle: {
        padding: 5,
        fontSize: 24,
        textAlign: "center"
    },
    courseTopic: {
        fontSize: 18,
        textAlign: "center",
        color: "red"
    },
    courseDesc: {
        padding: 10,
        fontSize: 16,
        textAlign: "center"
    }
});
