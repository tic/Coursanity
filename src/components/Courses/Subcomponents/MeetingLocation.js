import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Colors from '../../../constants/Colors';
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
import Buildings from '../../../constants/Buildings';

var Fuse = require('fuse.js')
var Locator = new Fuse(Buildings, {
    keys: ["Name"],
    distance: 50
});

export default function MeetingLocation(props) {

    let seen = [];
    let Locations = props.meetings.map(meeting => {
        let elligible = Locator.search(meeting.room);
        if(elligible.length < 1) return undefined;
        let Building = elligible[0];
        if(seen.indexOf(Building.Name) + 1) return undefined;
        seen.push(Building.Name);
        if(Building.Latitude == undefined) return undefined;
        return [Building.Latitude, Building.Longitude]
    }).filter((item, index, src) => item !== undefined);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Meeting Locations</Text>
            <MapView style={styles.map}
                        showsUserLocation={true}
                        showsMyLocationButton={true}
                        mapType={"hybrid"}
                        region={{
                            latitude: 38.034209,
                            latitudeDelta: .013,
                            longitude: -78.508206,
                            longitudeDelta: .013,
                        }}>
                { Locations.map(loc => (
                    <Marker coordinate={{
                                latitude: loc[0],
                                longitude: loc[1]
                            }}
                            title={loc[2]}
                            key={`${loc[0]}${loc[1]}`}/>
                )) }
            </MapView>
            <Text style={styles.warning}>Locations are approximate!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        borderBottomColor: "black",
        borderBottomWidth: 2,
        borderTopColor: "black",
        borderTopWidth: 2,
        borderStyle: "solid",
        paddingBottom: 10,
        paddingTop: 10,
    },
    title: {
        fontSize: 18,
        color: Colors.uvaBlue,
        marginBottom: 10,
    },
    map: {
        height: 300,
        width: "90%",
        borderRadius: 20,
    },
    warning: {
        color: Colors.uvaOrange,
        fontWeight: "bold",
    }
})
