import React from 'react';
import { AsyncStorage, View, StyleSheet, ScrollView, Button, Share, TouchableOpacity, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'
import Colors from '../../constants/Colors';
import InfoBox from './Subcomponents/InfoBox';
import GradeBox from './Subcomponents/GradeBox';
import MeetingCalendar from './Subcomponents/MeetingCalendar';
import MeetingLocation from './Subcomponents/MeetingLocation';
import { api_links } from '../../constants/API';

export default class SectionView extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            semesterID: props.navigation.getParam('semesterID'),
            sis_id: props.navigation.getParam('sis_id'),
            course: undefined
        }
    }

    _onShare = async () => {
        console.log("Sharing...");
        try {
          const result = await Share.share({
            message:
              'Check out '+this.state.course.subject+this.state.course.catalog_number+'-'+this.state.course.section+' with SIS ID '+this.state.sis_id,
          });

          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          alert(error.message);
        }
      };

      _onAdd = async () => {
          console.log("Adding...");
          try {
             const value = await AsyncStorage.getItem('COURSES');
             if (value !== null) {
               // We have data!!
               console.log(value);
             }
             else{
                 console.log("Setting up initial")
                 await AsyncStorage.setItem('COURSES', JSON.stringify({courses:[]}));
             }
             parsed = await JSON.parse(value);
             if(!parsed.courses.includes(this.state.sis_id)){
                parsed.courses.push(this.state.sis_id);
             }
             await AsyncStorage.setItem('COURSES', JSON.stringify(parsed));
           } catch (error) {
               console.log("error")
             // Error retrieving data
           }
        };

    static navigationOptions = ({navigation}) => {
        const { params = {} } = navigation.state;
        return {
            title: navigation.getParam('title'),
            headerRight:
            <View>
                <TouchableOpacity title="Share" onPress={params.onShare}>
                  <Text>Share</Text>
                </TouchableOpacity>
                <TouchableOpacity title="Share" onPress={params.onAdd}>
                  <Text>Add</Text>
                </TouchableOpacity>
            </View>
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({ onShare: this._onShare });
        this.props.navigation.setParams({ onAdd: this._onAdd });
    }

    componentWillMount() {
        let get = async () => {
            let resp = await fetch(`${api_links.api_base}/search?term_id=${this.state.semesterID}&sis_id=${this.state.sis_id}`);
            let parsed = await resp.json();
            this.setState({
                course: parsed.data[0],
            });
        }
        get();
    }

    render() {
        if(this.state.course === undefined) return (<View/>);
        return (
            <View style={{flex: 1}}>
                <ScrollView>
                    <InfoBox professors={this.state.course.instructors} meetings={this.state.course.meetings}/>
                    <MeetingCalendar meetings={this.state.course.meetings}/>
                    <MeetingLocation meetings={this.state.course.meetings}/>
                    <GradeBox subject={this.state.course.subject}  catalog_number={this.state.course.catalog_number}/>
                </ScrollView>
            </View>
        )
    }
}
