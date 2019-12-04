import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import Colors from '../../../constants/Colors';

const HEIGHT_PER_HOUR = 35;
const HEIGHT_PER_MINUTE = HEIGHT_PER_HOUR / 60;
const WIDTH_PER_DAY = 70;
const DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

export default function MeetingCalendar(props){
    if(props.meetings.length < 1) return (<View/>);

    let earliestStart = props.meetings.reduce(
            (accum, meeting) => accum < parseInt(meeting.start.slice(0, 2)) ? accum : parseInt(meeting.start.slice(0, 2)),
            24) - 2; earliestStart = earliestStart < 0 ? 0 : earliestStart;
    let latestStop = props.meetings.reduce(
            (accum, meeting) => accum > parseInt(meeting.finish.slice(0, 2)) ? accum : parseInt(meeting.finish.slice(0, 2)),
            0) + 3; latestStop = latestStop > 24 ? 24 : latestStop;

    let diff = latestStop - earliestStart, hours = [];
    let CalHeight = diff * HEIGHT_PER_HOUR + 8;
    while(diff--) hours.push("");

    return (
        <View style={styles.container}>
            <Text>Meeting Calendar!</Text>
            <View style={styles.week}>
                <View style={styles.sideClock}>
                    {hours.map((_, i) => <Text key={i} style={styles.time}>{`${earliestStart + i}:00`}</Text>)}
                </View>
                <ScrollView horizontal={true}>
                    <View style={{...styles.days, height: CalHeight, width: WIDTH_PER_DAY * 7}}>
                        {hours.map((_, i) => <View key={i} style={{
                                                                    ...styles.hourDivider,
                                                                    position: "relative",
                                                                    top: i * HEIGHT_PER_HOUR - 1
                                                                }}/>)}
                        {props.meetings.map((meeting, i) => {
                            let toCalendar = [];
                            let j = 0;
                            while(j < meeting.days.length) {
                                toCalendar.push(DAYS.indexOf(meeting.days.slice(j, j + 2)));
                                j+= 2;
                            }
                            let meetingLength = (parseInt(meeting.finish.slice(0, 2)) - parseInt(meeting.start.slice(0, 2))) * 60 + parseInt(meeting.finish.slice(-2)) - parseInt(meeting.start.slice(-2));
                            toCalendar = toCalendar.map((day, j) => <View key={`${i}${j}`} style={{
                                    ...styles.meeting,
                                    position: "absolute",
                                    top: (parseInt(meeting.start.slice(0, 2) - earliestStart) * 60 + parseInt(meeting.start.slice(-2))) * HEIGHT_PER_MINUTE,
                                    left: day * WIDTH_PER_DAY,
                                    width: WIDTH_PER_DAY,
                                    height: HEIGHT_PER_MINUTE * meetingLength,
                                }}></View>)
                            return toCalendar;
                        })}
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 20,
    },
    week: {
        flexDirection: 'row'
    },
    days: {
        height: 240,
        width: 630,
        borderColor: "black",
        borderWidth: 2
    },
    hourDivider: {
        borderBottomColor: "black",
        borderBottomWidth: 1,
    },
    time: {
        height: HEIGHT_PER_HOUR + 2,
    },
    sideClock: {
        marginTop: 6,
        marginRight: 5,
        marginLeft: 5,
    },
    meeting: {
        margin: 1,
        borderColor: Colors.uvaOrange,
        borderWidth: 2,
        backgroundColor: Colors.uvaBlue,
    }
})
