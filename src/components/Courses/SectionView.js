import React from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'
import Colors from '../../constants/Colors';

export default class SectionView extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        //info
        //calendar
        //maps
        //grades
        //rating
            //coming soon
        <View>
            <ScrollView>
                <InfoBox professors={this.state.professors} meetings={this.state.meetings}/>
                <MeetingCalendar meetings={this.state.meetings}/>
                <MeetingLocation meetings={this.state.meetings}/>
                <GradeBox professors={this.state.professors}/>
            </ScrollView>
        </View>
    }
}
