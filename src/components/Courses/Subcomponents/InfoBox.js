import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';

export default function InfoBox(props) {
    let profs = professors = props.professors.filter((instructor, index) => index === props.professors.indexOf(instructor));
    let profDisplay = (profs.length) > 2 ? profs.reduce((accum, prof, index) => {
        switch(index) {
            case profs.length - 2:
            return `${accum}${prof}, & `;

            case profs.length - 1:
            return `${accum}${prof}`;

            default:
            return `${accum}${prof}, `;
        }
    }, ``) : (
        (profs.length === 2) ? `${profs[0]} & ${profs[1]}` : profs[0]
    );

    // let meetingDisplay =

    return (
        <View>
            <Text>Instructor{props.professors.length > 1 ? 's' : ''}</Text>
            <Text>{profDisplay}</Text>
        </View>
    );
}
