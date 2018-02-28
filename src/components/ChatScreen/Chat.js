import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { TabNavigator } from 'react-navigation';

import TripScreen from '../TripsScreen/Trips';

export default class Chat extends React.Component {

    constructor(props) {
        super(props)
    }

    // navigation options to be used to navigate the class from other classes

    static navigationOptions = {
        title: 'Chat',
        header: null
    }

    render() {
        return (
            <View style={styles.mainStyle}>
                <Text>[Chat Feature Coming Soon]</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});