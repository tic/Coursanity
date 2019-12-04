import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import Colors from '../../../constants/Colors';

const HEIGHT_PER_HOUR = 38;
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
            <Text style={styles.title}>Class Calendar</Text>
            <View style={styles.week}>
                <View style={styles.sideClock}>
                    {hours.map((_, i) => <Text key={i} style={styles.time}>{`${(earliestStart + i) > 12 ? (earliestStart + i - 12) : (earliestStart + i)}:00`}</Text>)}
                </View>
                <ScrollView horizontal={true}>
                    <View style={{...styles.days, height: CalHeight, width: WIDTH_PER_DAY * 7}}>
                        {hours.map((_, i) => <View key={i} style={{
                                                                    ...styles.hourDivider,
                                                                    position: "relative",
                                                                    top: i * HEIGHT_PER_HOUR
                                                                }}/>)}
                        {DAYS.map((day, i) => <View key={i} style={{
                                                                ...styles.dayDivider,
                                                                height: CalHeight - 2,
                                                                left: i * WIDTH_PER_DAY - 2,
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
                                    top: (parseInt(meeting.start.slice(0, 2) - earliestStart) * 60 + parseInt(meeting.start.slice(-2))) * HEIGHT_PER_MINUTE + 2,
                                    left: day * WIDTH_PER_DAY - 3,
                                    width: WIDTH_PER_DAY,
                                    height: HEIGHT_PER_MINUTE * meetingLength,
                                }}></View>)
                            return toCalendar;
                        })}
                    </View>
                </ScrollView>
            </View>
            <Text style={styles.warning}>Swipe calendar side to side to see all days of the week!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        textAlign: "center",
        marginBottom: 10,
    },
    warning: {
        fontSize: 12,
        textAlign: "center",
        color: Colors.uvaOrange,
        margin: 5,
        fontWeight: "bold",
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
        height: HEIGHT_PER_HOUR,
    },
    sideClock: {
        marginRight: 5,
        marginLeft: 5,
    },
    meeting: {
        margin: 1,
        borderColor: Colors.uvaOrange,
        borderWidth: 2,
        backgroundColor: Colors.uvaBlue,
    },
    dayDivider: {
        position: "absolute",
        borderRightColor: "black",
        borderRightWidth: 1,
        width: WIDTH_PER_DAY,
    }
})
