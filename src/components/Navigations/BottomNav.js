import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation';

export default class BottomNav extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <BottomNavigation
                    labelColor="white"
                    rippleColor="white"
                    style={styles.bottomNavigation}
                >
                    <Tab
                        barBackgroundColor="#37474F"
                        label="Movies & TV"
                    />
                    <Tab
                        barBackgroundColor="#00796B"
                        label="Music"
                    />
                    <Tab
                        barBackgroundColor="#5D4037"
                        label="Books"
                    />
                    <Tab
                        barBackgroundColor="#3E2723"
                        label="Newsstand"
                    />
                </BottomNavigation>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    bottomNavigation: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 56
    }
})