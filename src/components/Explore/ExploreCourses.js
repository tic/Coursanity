import React, {useState, useEffect} from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import api_links from '../../constants/API';


// Access current semester id via props.semesterID
// It's a hook, so when the user changes the main slider, the
//      will automagically propagate down here.
export default function ExploreSubjects(props) {
    const [allCourses, setAllCourses] = useState([]);
    const [page, setPage] = useState(0);

    useEffect(() => {
        console.log("Running effect", props.semesterID);
        const get = async () => {
            let resp = await fetch(`${api_links.api_base}/search?term_id=${props.semesterID}&page=${page}&per=50`);
            let parsed = await resp.json();
            setAllCourses(parsed);
            console.log(parsed);
        }
        // Only execute if an actual semester has been selected.
        if(props.semesterID !== "0000") get();
    }, []);

    let displayCourse = course => {
        return (
            <Text key={course._id}>{`${course.subject}${course.catalog_number} - ${course.title}`}</Text>
        );
    }

    return (
        <View>
            <Text>{props.semesterID}</Text>
            <ScrollView semester={props.semesterID}>
                {allCourses.map((item, index) => displayCourse(item))}
            </ScrollView>
        </View>
    );
}
