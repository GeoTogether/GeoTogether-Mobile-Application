import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';

export default class TopNav extends Component {
    render() {
        return (
            <View style={styles.containerNav}>


            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerNav:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    navButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        padding: '3%',
        width: '33.33333%',
    },
    navIcons: {
        width: 25,
        height: 25
    }
})