import React from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'
import Colors from '../constants/Colors';

export default function LinksScreen() {
  return (
    <LinearGradient style={styles.container}
            start={{x: 0.0, y: 0.0}}
            end={{x: 0.0, y: 1.0}}
            locations={[0.28,0.43,0.58,0.73]}
            colors={[Colors.uvaOrange, "#eee", "#eee", Colors.uvaBlue]}>
        <View style={styles.searchRow}>
            <TextInput
                style={styles.searchBar}
                placeholder = "Chemistry MoWeFr"
                />
            <TouchableOpacity style={styles.searchButton}>
                <FontAwesome
                      name="search"
                      size={26}
                      style={{ color: Colors.uvaBlue }}
                />
            </TouchableOpacity>
        </View>
    </LinearGradient>
  );
}

LinksScreen.navigationOptions = {
  title: 'Search',
};

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
