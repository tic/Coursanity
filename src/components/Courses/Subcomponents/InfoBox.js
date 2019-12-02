import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';

export default function InfoBox(props) {
    let profDisplay = (props.professors.length) > 2 ? props.professors.reduce((accum, prof, index) => {
        switch(index) {
            case props.professors.length - 2:
            return `${accum}${prof}, & `;

            case props.professors.length - 1:
            return `${accum}${prof}`;

            default:
            return `${accum}${prof}, `;
        }
    }, ``) : (
        (props.professors.length === 2) ? `${props.professors[0]} & ${props.professors[1]}` : props.professors[0]
    );

    // let meetingDisplay = 

    return (
        <View>
            <Text>Instructor{props.professors.length > 1 ? 's' : ''}</Text>
            <Text>{profDisplay}</Text>
        </View>
    );
}
