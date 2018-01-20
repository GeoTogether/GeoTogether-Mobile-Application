/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View, NavigatorIOS } from 'react-native';
import SplashScreen from './src/components/SplashScreen';
import LinearGradient from 'react-native-linear-gradient';
import { StackNavigator } from 'react-navigation';

export default StackNavigator ({
    Splash: {
        screen: SplashScreen,
        navigationOptions: {
            //title: 'GeoTogether'
            header: null

        },
    }
});