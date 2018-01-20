import React, {Component} from 'react';
import {View, Image, TouchableOpacity, StyleSheet, Text} from 'react-native';


export default class SplashButtons extends Component {

    render(){

        return(

            <View style={styles.container}>
                <TouchableOpacity style={styles.buttonContainer}>
                    <Text style={styles.signInText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer}>
                    <Text style={styles.signInText}>Sign Up</Text>
                </TouchableOpacity>
            </View>

        );

    }

}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        backgroundColor: 'rgb(0,25,88)',
        paddingVertical: 10,
        borderRadius: 5,
        width: 130,
        margin: 5,
        marginBottom: 400
    },
    signInText: {
        fontSize: 14,
        textAlign: 'center',
        color: 'white',
        fontWeight: '500',
        //margin: 10
    }

});