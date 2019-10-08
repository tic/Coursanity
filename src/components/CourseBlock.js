// http://scheduler.gifit.io/api/search?term_id=1198&subject=CS&catalog_number=2150&per=25&page=0

import React from 'react';
import { Text, View, Stylesheet } from 'react-native';

export default class CourseBlock extends React.Component {
    render() {
        return (
            <View style={styles.course_header}>

            </View>
        );
    }
}

const styles = Stylesheet.create({
    course_header: {
            color: 'white',
    },
});
