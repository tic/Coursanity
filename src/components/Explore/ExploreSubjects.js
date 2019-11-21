import React, {useState, useEffect} from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import api_links from '../../constants/API';


// Access current semester id via props.semesterID
// It's a hook, so when the user changes the main slider, the
//      will automagically propagate down here.
export default function ExploreSubjects(props) {
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        const get = async () => {
            let resp = await fetch(`${api_links.api_base}/subjects`);
            let parsed = await resp.json();
            setSubjects(parsed);
        }
        get();
    }, []);

    let displaySubject = sub => {
        return (
            <Text key={sub._id}>{`${sub.subject} - ${sub.name}`}</Text>
        );
    }

    return (
        <View>
            <ScrollView>
                {subjects.map((item, index) => displaySubject(item))}
            </ScrollView>
        </View>
    );
}
