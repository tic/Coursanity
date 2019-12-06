import React, {useState, useEffect} from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import LoadingSpinner from '../LoadingSpinner';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../constants/Colors';
import api_links from '../../constants/API';


export default function CommonDisplayTab(props) {

    switch(props.type) {
        case "course":
        var content = (
            <View style={styles.innerCard}>
                <Text style={styles.commonName}>{props.course.common_name}</Text>
                <View style={styles.extendedText}>
                    <Text>{props.course.title}</Text>
                </View>
            </View>
        );
        var gradient = [Colors.uvaBlue, '#ffffff', '#ffffff', Colors.uvaOrange];
        break;

        case "subject":
        var content = (
            <View style={styles.innerCard}>
                <Text style={styles.commonName}>{props.subject.subject}</Text>
                <View style={styles.extendedText}>
                    <Text>{props.subject.name}</Text>
                </View>
            </View>
        );
        //var gradient = [Colors.uvaBlue, '#ffffff', '#ffffff', Colors.uvaOrange];
        var gradient = [Colors.uvaOrange, '#ffffff', '#ffffff', Colors.uvaBlue];
        break;

        case "school":
        var content = (
            <View style={styles.innerCard}>
                <Text style={styles.commonName}>{props.school}</Text>
                <View style={styles.extendedText}>
                    <Text>{props.name}</Text>
                </View>
            </View>
        );
        var gradient = [Colors.uvaBlue, '#ffffff', '#ffffff', Colors.uvaOrange];
        break;

        default:
        var content = (<View/>);
        break;
    }

    return (
        <View style={styles.container}>
            <LinearGradient
                    colors={gradient}
                    locations={[0, .3, .7, 1]}
                    style={styles.gradient}>
                {content}
            </LinearGradient>
        </View>
    );
}

const Dimension = Dimensions.get('screen');
const styles = StyleSheet.create({
    container: {
        width: Dimension.width * .95,
        height: 50,
        marginTop: 5,
        marginBottom: 10,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    gradient: {
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    innerCard: {
        backgroundColor: "#ffffff",
        height: 45,
        width: "98%",
        flexDirection: 'row',
        alignItems: 'center'
    },
    commonName: {
        width: "27%",
        paddingLeft: 2.5,
        paddingRight: 2.5,
        fontSize: 16,
    },
    extendedText: {
        width: "73%",
        paddingLeft: 2.5,
        fontStyle: "italic",
    }
});
