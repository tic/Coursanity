import React, { Component, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Image, Button, Dimensions } from 'react-native';
import * as Expo from 'expo';
import * as Google from 'expo-google-app-auth';
import { NavigationActions } from 'react-navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';

export default function SignIn({navigation}) {
    const [cred, setCred] = useState({
        signedIn: false,
        name: '',
        photoUrl: '',
    });

    let signIn = async () => {
        try {
            const result = await Google.logInAsync({
                androidClientId:
                    //'322502843203-7e6o9334dvsha10rrkqfprdjkhq5bsln.apps.googleusercontent.com',
                    '389833247192-q4rdv9nj34okv7uiq5ape07m43bdrp0e.apps.googleusercontent.com',
                iosClientId:
                    '389833247192-nbml6gcrhr91g2oti5m33kjdgdmkkcu8.apps.googleusercontent.com',
                scopes: ['profile', 'email'],
            });

            if (result.type === 'success') {
                navigation.push('Home', {
                    name: result.user.name,
                    photoUrl: result.user.photoUrl,
                });
                /*setState({
                    signedIn: true,
                    name: result.user.name,
                    photoUrl: result.user.photoUrl,
                });*/
            }
        } catch (e) { console.log('error', e); }
    }

    return (
            <View style={styles.container}>
                <LoginPage signIn={signIn}/>
            </View>
    );
}

const LoginPage = props => {
    return (
        <View style={styles.container}>
            <Image style={styles.background} source={require('../assets/images/tile.jpg')}/>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.fullWidthButton} onPress={() => props.signIn()}>
                    <Text style={styles.fullWidthButtonText}>Login with Google</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

SignIn.navigationOptions = ({ navigation }) => ({
    header: null,
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#232d4b',
        alignItems: 'center',
        justifyContent: 'center',
    },
    background: {
        position: "absolute",
        top: 0,
        resizeMode: "repeat",
        height: 1000,
        zIndex: -1,
    },
    buttonContainer: {
        padding: 40,
        width: Dimensions.get('screen').width,
        backgroundColor: "white",
        borderTopWidth: 3,
        borderBottomWidth: 3,
        borderColor: "black",
    },
    fullWidthButton: {
        backgroundColor: Colors.uvaOrange,
        borderRadius: 4,
        padding: 18,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.uvaBlue,
        borderWidth: 2,
    },
    fullWidthButtonText: {
        fontSize: 24,
        color: 'white'
    }
});
