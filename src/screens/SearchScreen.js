import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

export default function LinksScreen() {
  return (
    <ScrollView style={styles.container}>

    </ScrollView>
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
  },
});
