import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TouchableNativeFeedback,
    View
} from 'react-native';
import * as firebase from 'firebase';
import Button from 'react-native-button';


const firebaseConfig = {
    apiKey: "AIzaSyD9C3z_T6oJ6-MsZN4Dtnp5RjTa8woS3jk",
    authDomain: "geotogether-405ad.firebaseapp.com",
    databaseURL: "https://geotogether-405ad.firebaseio.com",
    projectId: "geotogether-405ad",
    storageBucket: "geotogether-405ad.appspot.com",
};

firebase.initializeApp(firebaseConfig);


const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu butrrton for dev menu',
});

export default class App extends Component<{}> {

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if(user != null) {
                console.log(user)
            }
        })
    }

    async logInWithFacebook() {
        const{type,token} = await Expo.Facebook.logInWithReadPermissionsAsync('140720199952834', {permissions: ['public_profile'] })

        if(type == 'success')
        {
            const credential = firebase.auth.FacebookAuthProvider.credential(token)

            firebase.auth().signInWithCredential(credential).catch((error) => {
                console.log(error)
            })
        }
    }

    render() {
        return (
            <View style={styles.container}>



                <Button style={{color: 'black'}}
                        onPress={() => this.logInWithFacebook()}> <Text>Login With Facebook</Text> </Button>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    text: {
        color: 'black',
        fontSize: 15,
    },
    button: {
        backgroundColor: 'black',
        height: 30,
        width: 60,
    }
});
