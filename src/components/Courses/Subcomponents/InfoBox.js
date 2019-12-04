import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Colors from '../../../constants/Colors';

const WIDTH = Dimensions.get('screen').width;

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
        <View style={styles.container}>
            <Text style={styles.sectionText}>Section Information</Text>
            <View style={styles.row}>
                <Text style={{width: WIDTH * .25}}>Instructor{profs.length > 1 ? 's' : ''}</Text>
                <Text style={{width: WIDTH * .75}}>{profDisplay}</Text>
            </View>
            <View style={{...styles.row, marginTop: 5}}>
                <Text style={{width: WIDTH * .25}}>Meetings</Text>
                <View style={{...styles.col, width: WIDTH * .75}}>
                    {props.meetings.map((meeting, i) => {
                        let timeA = parseInt(meeting.start.slice(0, 2)), timeB = parseInt(meeting.finish.slice(0, 2));
                        timeA = timeA > 12 ? timeA - 12 : timeA; timeB = timeB > 12 ? timeB - 12 : timeB;
                        return (<Text key={i}>{`${meeting.days} ${timeA}${meeting.start.slice(-3)}-${timeB}${meeting.finish.slice(-3)}`}</Text>);
                    })}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 15,
        paddingBottom: 10,
        marginBottom: 10,
        borderBottomColor: "black",
        borderBottomWidth: 2,
    },
    sectionText: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 5,
    },
    row: {
        flexDirection: 'row',
    },
    col: {
        flexDirection: 'column',
    }
})
