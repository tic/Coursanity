import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import Colors from '../../../constants/Colors';
import { api_links } from '../../../constants/API';
import { LineChart } from "react-native-chart-kit";

export default class GradeBox extends React.Component{
    constructor(props){
        super(props);
        this.state={
            grades:[],
            averages:[0],
            terms:["0000"],
        }
    }

    componentWillMount() {
        let get = async () => {
            let resp = await fetch(`${api_links.api_base}/grades?course[catalog_number]=${this.props.catalog_number}&course[subject]=${this.props.subject}`);
            let parsed = await resp.json();
            this.setState({
                grades: parsed.grades,
            });
            this.trendGraph(parsed.grades);
        }
        get();
    }

    trendGraph(grades=this.state.grades){
        let averages = [];
        let terms = [];
        //let gradeMap = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "F", "OT", "DR", "W"];
        for (var term in this.state.grades) {
            termGradeDict = this.state.grades[term];
            termSections = [];
            var sum = 0;
            for (var sect in termGradeDict){
                sum += parseFloat(termGradeDict[sect][0]);
                sect = sect.replace(/["']/g, "").split("|");
            }
            var termGPA = Math.round((sum*1.0/Object.keys(termGradeDict).length)*100)/100;
            averages.push(termGPA);
            terms.push(term);
        }
        this.setState({
            averages,
            terms,
        })
    }

    render(){
        //the two charts
        console.log(Dimensions.get("window").width)
        return (
            <View>
              <Text>Bezier Line Chart</Text>
              <LineChart
                data={{
                  labels: this.state.terms,
                  datasets: [
                    {
                      data: this.state.averages,
                  },
                  {
                      data: [4], // <=== e.g: [400], the maximum you want, only one value in the array.
                      color: () => `rgba(0, 0, 0, 0)` // <=== Here enable transparency of the rgba() to hide the max Y Value dot from your chart.
                    },
                  ]
                }}
                width={Dimensions.get("window").width} // from react-native
                height={220}
                fromZero={true}
                chartConfig={{
                  backgroundColor: "#e26a00",
                  backgroundGradientFrom: "#fb8c00",
                  backgroundGradientTo: "#ffa726",
                  decimalPlaces: 2, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16
                  },
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16
                }}
              />
            </View>
        )
    }
}
