import React, { Component, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Image, Button } from 'react-native';
import * as Expo from 'expo';
import * as Google from 'expo-google-app-auth';
import { NavigationActions } from 'react-navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';



export default function SignIn({navigation}) {

    const [cred, setCred] = useState({
        signedIn: false,
        name: '',
        photoUrl: '',
    });

    signIn = async () => {
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

                navigation.push('Home');
                /*setState({
                    signedIn: true,
                    name: result.user.name,
                    photoUrl: result.user.photoUrl,
                });*/
            } else {
                console.log('cancelled');
            }
        } catch (e) {
            console.log('error', e);
        }
    }

    return (
            <View style={styles.container}>
                {cred.signedIn ? (
                    <LoggedInPage name={cred.name} photoUrl='carterMe.jpg' />
                ) : (
                        <LoginPage signIn={signIn} />
                    )}
            </View>
    );

}

const LoginPage = props => {
    return (

        <View style={styles.screen}>
          {/*  <View style={styles.flexingRight}>
                <Text style={{color:'#fff', fontWeight: 'bold'}}>Email:</Text>
                <TextInput style=
                    {styles.input} placeholder="compID@virginia.edu" />
            </View>
            <View style={styles.flexingRight}>
                <Text style={{color:'#fff', fontWeight: 'bold'}}>Password:</Text>
                <TextInput style=
                    {styles.input} placeholder="Enter Your Password" underlineColorAndroid="transparent" secureTextEntry={true} />
    </View>*/}
            {/*<Button title="Log In" color="#ed6d28" onPress={() => props.signIn()} />*/}
                <View style={styles.inputsContainer}>
                    <TouchableOpacity style={styles.fullWidthButton} onPress={() => props.signIn()}>
                    <Text style={styles.fullWidthButtonText}>LOGIN</Text>
                    </TouchableOpacity>
                </View>
        </View>


        // <View>
        //   <Text style={styles.header}>Sign In With Google</Text>
        //   <Button title="Sign in with Google" onPress={() => props.signIn()} />
        // </View>
    );
};

SignIn.navigationOptions = ({ navigation }) => ({
    title: "Google Sign In",
});

const LoggedInPage = props => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Welcome:{props.name}</Text>
            <Image style={styles.image} source={{ uri: props.photoUrl }} />
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#232d4b',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize: 25,
    },
    // image: {
    //     marginTop: 15,
    //     width: 150,
    //     height: 150,
    //     borderColor: 'rgba(0,0,0,0.2)',
    //     borderWidth: 3,
    //     borderRadius: 150,
    // },
    screen: {
        padding: 50,
    },
    flexingRight: {
        flexDirection: 'row',
        marginBottom: 30,
        justifyContent: 'space-between',
    },
    // input: {
    //     height: 18,
    //     borderColor: '#000',
    //     borderWidth: 1,
    //     marginLeft: 5,
    // },
    fullWidthButton: {
        backgroundColor: '#ed6d28',
        height:70,
        width: 150,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      },
      fullWidthButtonText: {
        fontSize:24,
        color: 'white'
      }

});
