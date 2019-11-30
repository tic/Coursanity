import React, {useState, useEffect} from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import CommonDisplayTab from '../Courses/CommonDisplayTab';
import { school_map } from '../../constants/API';


// Access current semester id via props.semesterID
// It's a hook, so when the user changes the main slider, the
//      will automagically propagate down here.
export default function ExploreSchools(props) {
    let displaySchool = (key, index) => {
        return (
            <TouchableOpacity key={index}>
                <CommonDisplayTab   type="school"
                                    school={key}
                                    name={school_map[key]}/>
            </TouchableOpacity>
        );
    }

    return (
        <View>
            <ScrollView>
                {Object.keys(school_map).map(displaySchool)}
            </ScrollView>
        </View>
    );
}
