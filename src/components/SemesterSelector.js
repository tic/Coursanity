import React, {useState, useEffect} from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { api_links } from '../constants/API';

/**
 *      How to use this component:
 * ====================================
 *  - In the parent component, create a state (useState()) which holds a string
 *      of the current ID. Pass in a property called setSemesterID= the function
 *      which was created from the call to useState()
**/
export default function SemesterSelector(props) {
    const [semesters, setSemesters] = useState([]);

    useEffect(() => {
        const get = async () => {
            let resp = await fetch(`${api_links.api_base}/all_terms`);
            let content = await resp.json();
            let sems = content.terms.reverse();
            setSemesters(sems);
            if(props.setSemesterID) props.setSemesterID(sems[0]._id);
        }
        get();
    }, []);

    return (
        <View style={styles.container}>
            <Carousel
                data={semesters}
                renderItem={({item, index}) => (<Text style={styles.card}>{item.name}</Text>)}
                sliderWidth={400}
                itemWidth={200}
                onSnapToItem={index => {
                        if(props.setSemesterID) props.setSemesterID(semesters[index]._id)
                    }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection:      "column",
        justifyContent:     "center",
        alignItems:         "center",
        width:              "100%",
        padding:            4,
        borderBottomWidth:  1,
        borderBottomColor:  "#ddd"
    },
    card: {
        padding:            10,
        textAlign:          "center",
        fontSize:           16,
    }
});
