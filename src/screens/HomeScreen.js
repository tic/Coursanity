import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { MonoText } from '../components/StyledText';
import CourseBlock from '../components/CourseBlock';

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
      <View style={styles.main_header}>
        <Image source={require('../assets/images/scheduler-icon.png')} style={{
            width: 50,
            height: 50,
        }}/>
        <Text style={styles.main_header_text}>
          UVA Scheduler
        </Text>
      </View>
      <ScrollView
        style={styles.sub_container}
        contentContainerStyle={styles.contentContainer}>
        <CourseBlock/>
        <Text style={styles.generic_text}>
          Designed to integrate Lou's List with scheduling tools.
        </Text>
      </ScrollView>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use
        useful development tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/development-mode/'
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232d4b',
  },
  sub_container: {
    marginLeft: 10,
    marginRight: 10,
  },
  developmentModeText: {
    marginBottom: 20,
    color: '#fff',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  main_header: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 50,
    paddingBottom: 25,
    borderBottomWidth: 3,
    borderBottomColor: 'white',
    borderStyle: 'solid',
    marginLeft: 15,
    marginRight: 15,
  },
  main_header_text: {
      marginTop: 8,
      marginLeft: 5,
      textAlign: 'center',
      color: 'white',
      fontSize: 36,
      textShadowRadius: 3,
      textShadowColor: 'white',
  },
  generic_text: {
    color: 'white',
    fontSize: 18,
  },
});
