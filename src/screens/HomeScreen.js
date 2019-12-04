import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/Colors';
import { MonoText } from '../components/StyledText';

// <View style={styles.helpContainer}>
//   <TouchableOpacity onPress={handleHelpPress} style={styles.helpLink}>
//     <Text style={styles.helpLinkText}>
//       Help, it didn’t automatically reload!
//     </Text>
//   </TouchableOpacity>
// </View>

// <View style={styles.tabBarInfoContainer}>
//   <Text style={styles.tabBarInfoText}>
//     This is a tab bar. You can edit it in:
//   </Text>
//
//   <View
//     style={[styles.codeHighlightContainer, styles.navigationFilename]}>
//     <MonoText style={styles.codeHighlightText}>
//       navigation/MainTabNavigator.js
//     </MonoText>
//   </View>
// </View>

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/images/tile.jpg')} style={styles.backgroundImage}/>
            <View style={styles.main_header}>
                <Image  source={require('../assets/images/scheduler-icon.png')}
                        style={{
                            width: 50,
                            height: 50,
                        }}/>
                <Text style={styles.main_header_text}>Coursanity</Text>
            </View>
            <Text style={{...styles.generic_text,
                            backgroundColor: "white",
                            textAlign: "center",
                            paddingBottom: 20,
                            fontStyle: "italic"
                        }}>
                cure the course insanity</Text>
            <ScrollView
                    style={styles.sub_container}
                    contentContainerStyle={styles.contentContainer}>
                <Text style={styles.generic_text}>
                    Overview
                </Text>
            </ScrollView>
        </View>
    );
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232d4b',
  },
  backgroundImage: {
    position: "absolute",
    resizeMode: "repeat",
    height: 1000,
    zIndex: -1
  },
  sub_container: {
    marginLeft: 15,
    marginRight: 15,
    padding: 10,
    backgroundColor: "white",
    borderTopWidth: 3,
    borderTopColor: 'black',
    borderStyle: 'solid',
  },
  contentContainer: {
    paddingTop: 30,
  },
  main_header: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: 'white',
    padding: 10,
  },
  main_header_text: {
      marginTop: 8,
      marginLeft: 5,
      textAlign: 'center',
      color: Colors.uvaOrange,
      fontSize: 36,
      textShadowRadius: 3,
      textShadowColor: Colors.uvaBlue,
  },
  generic_text: {
    color: 'black',
    fontSize: 18,
  },
});
