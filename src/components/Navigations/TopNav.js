import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import BottomNav from "../Navigations/BottomNav";

export default class TopNav extends Component {
    render() {
        return (
            <View style={styles.containerNav}>
                <Image style={styles.profileIcon}
                    source={require('../../images/account.png')}
                />
                <Text style={styles.screenName}>Home</Text>

                <Image
                    style={styles.settingsIcon}
                    source={require('../../images/settings.png')}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerNav:{
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        height: 10,
        marginBottom: '135%',
        backgroundColor: '#C0C0C0',
        alignItems: 'center',
    },
    screenName: {
        textAlign: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        color: '#000',
        marginLeft: '37%',
    },
    profileIcon: {
        width: 25,
        height: 25,
        marginLeft: '2%',
    },
    settingsIcon: {
        width: 25,
        height: 25,
        marginLeft: '37%',
    }
})