import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';

export default class BottomNav extends Component {
    render() {
        return (
            <View style={styles.containerNav}>

                <TouchableOpacity style={styles.navButtonContainer}>
                    <Image
                        style={styles.navIcons}
                        source={require('../../images/chat.png')}
                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.navButtonContainer}>
                    <Image
                        style={styles.navIcons}
                        source={require('../../images/home.png')}
                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.navButtonContainer}>
                    <Image
                        style={styles.navIcons}
                        source={require('../../images/upload.png')}
                    />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerNav:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    navButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: '3%',
        width: '33.33333%',
    },
    navIcons: {
        width: 25,
        height: 25
    }
})