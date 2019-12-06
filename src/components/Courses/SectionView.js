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
          //console.log(this.props.navigation);
          try {
             const value = await AsyncStorage.getItem('COURSES');
             if (value !== null) {
               // We have data!!
             }
             else{
                 //console.log("Setting up initial")
                 await AsyncStorage.setItem('COURSES', JSON.stringify({courses:[]}));
             }
             parsed = await JSON.parse(value);
             if(!parsed.courses.includes(this.state.sis_id)){
                parsed.courses.push(this.state.sis_id);
                this.props.navigation.setParams({ add: <FontAwesome size={24} name={'trash'} />})
             }
             else if(parsed.courses.includes(this.state.sis_id)){
                 //remove from list.
                 let i = parsed.courses.indexOf(this.state.sis_id);
                 //console.log(i);
                 //console.log("Removing:", this.state.sis_id)
                 parsed.courses.splice(i, 1);
                 this.props.navigation.setParams({ add: <FontAwesome size={24} name={'plus'} /> })
             }
             console.log(parsed.courses)
             await AsyncStorage.setItem('COURSES', JSON.stringify(parsed));
           } catch (error) {
               console.log("error")
             // Error retrieving data
           }
        };

    _selectIcon = async() => {
        try {
           const value = await AsyncStorage.getItem('COURSES');
           if (value !== null) {
             // We have data!!
           }
           else{
               //console.log("Setting up initial")
               await AsyncStorage.setItem('COURSES', JSON.stringify({courses:[]}));
           }
           parsed = await JSON.parse(value);
           if(!parsed.courses.includes(this.state.sis_id)){
              this.props.navigation.setParams({ add: <FontAwesome size={24} name={'plus'} />})
           }
           else if(parsed.courses.includes(this.state.sis_id)){
               this.props.navigation.setParams({ add: <FontAwesome size={24} name={'trash'} /> })
           }
           console.log(parsed.courses)
           await AsyncStorage.setItem('COURSES', JSON.stringify(parsed));
         } catch (error) {
             console.log("error")
           // Error retrieving data
         }
    }

    static navigationOptions = ({navigation}) => {
        const { params = {} } = navigation.state;
        return {
            title: navigation.getParam('title'),
            headerRight:
            <View style={{flex: 1, flexDirection:'row'}}>
                <TouchableOpacity style={{paddingRight:10}} title="Add" onPress={params.onAdd}>
                  {params.add || <FontAwesome size={24} name={'plus'} />}
                </TouchableOpacity>
                <TouchableOpacity style={{paddingRight:10}} title="Share" onPress={params.onShare}>
                  <FontAwesome size={24} name={'share'} />
                </TouchableOpacity>
            </View>
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({ onShare: this._onShare });
        this.props.navigation.setParams({ onAdd: this._onAdd });
        this._selectIcon();
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
                    <InfoBox professors={this.state.course.instructors} meetings={this.state.course.meetings} sis_id={this.state.sis_id}/>
                    <MeetingCalendar meetings={this.state.course.meetings}/>
                    <MeetingLocation meetings={this.state.course.meetings}/>
                    <GradeBox subject={this.state.course.subject}  catalog_number={this.state.course.catalog_number}/>
                </ScrollView>
            </View>
        )
    }
}
