import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    NativeAppEventEmitter
} from 'react-native';
import { RevMobManager } from 'react-native-revmob';
export default class Example extends React.Component {
    componentDidMount () {
        RevMobManager.startSession("5ac329b0a30c3b1c882e56fb", function revMobStartSessionCb(err){
            if(!err) RevMobManager.loadBanner(); // Load banner if session starts successfully.
        })
        NativeAppEventEmitter.addListener('onRevmobBannerDidReceive', () => {
            RevMobManager.showBanner(); // Show banner if it's loaded
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Hello World!
                </Text>
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
    }
});