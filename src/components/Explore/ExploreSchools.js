import React, {useState, useEffect} from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import api_links from '../../constants/API';


// Access current semester id via props.semesterID
// It's a hook, so when the user changes the main slider, the
//      will automagically propagate down here.
export default function ExploreSchools(props) {
    const [schools, setSchools] = useState([]);

    useEffect(() => {
        const get = async () => {
            let resp = await fetch(`${api_links.api_base}/schools`);
            let parsed = await resp.json();
            setSchools(parsed);
        }
        // get();
    }, []);

    let displaySchool = scl => {
        return (
            <Text key={scl._id}>{`placeholder`}</Text>
        );
    }

    return (
        <View>
            <ScrollView>
                {schools.map((item, index) => displaySchool(item))}
            </ScrollView>
        </View>
    );
}
