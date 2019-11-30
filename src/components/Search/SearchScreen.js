import React from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { StackNavigator } from 'react-navigation';
import SearchResults from './SearchResults';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'
import Colors from '../../constants/Colors';
import SemesterSelector from '../SemesterSelector';


export default class SearchScreen extends React.Component {
    constructor(props){
        super(props)
        this.state= {
            search: "",
            semesterID:"1202"
        };
    }

    static navigationOptions = ({ navigation }) => ({
        title: "Search",
    })

    handleClick = () => {
        //console.log("Started search with query", this.state.search);

        this.props.navigation.push("SearchResults", {
            query:this.state.search,
            sem_id:this.state.semesterID
        })
        //launch new view of searches
    }

    textUpdate(event) {
        this.setState({
            search: event.nativeEvent.text,
        });
    }

    getText() {
        return this.state.search;
    }

    changeSemester(semesterID) {
        this.setState({
            semesterID,
        })
    }

    render(){
        return (
        <View style={{flex:1}}>
          <SemesterSelector
                  setSemesterID={this.changeSemester.bind(this)}/>
          <LinearGradient style={styles.container}
                  start={{x: 0.0, y: 0.0}}
                  end={{x: 0.0, y: 1.0}}
                  locations={[0.28,0.43,0.58,0.73]}
                  colors={[Colors.uvaOrange, "#eee", "#eee", Colors.uvaBlue]}>
              <View style={styles.searchRow}>
                  <TextInput
                      style={styles.searchBar}
                      placeholder = "CS4720"
                      onChange={this.textUpdate.bind(this)}
                      />
                  <TouchableOpacity onPress={this.handleClick} style={styles.searchButton}>
                      <FontAwesome
                            name="search"
                            size={26}
                            style={{ color: Colors.uvaBlue }}
                      />
                  </TouchableOpacity>
              </View>
          </LinearGradient>
     </View>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: Colors.tintColor,
    justifyContent: "center",
    alignItems: "center",
  },
  searchRow: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center"
  },
  searchButton: {
      borderColor: Colors.uvaBlue,
      borderWidth: 2,
      borderRadius: 7,
      padding: 7,
  },
  searchBar: {
      width: "75%",
      height: 45,
      paddingLeft: 4,
      borderRadius: 5,
      backgroundColor: "white",
  }
});
