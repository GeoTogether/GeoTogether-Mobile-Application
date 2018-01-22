import React, {Component} from 'react';
import {View, Image, TouchableOpacity, StyleSheet, Text} from 'react-native';


export default class SplashTextLogo extends Component {

    render(){

        return(

            <View style={styles.container}>
                <Image
                    style={styles.geoTextStyle}
                    source={require('../images/geotogethertext.png')}
                />
            </View>

        );

    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    geoTextStyle: {
        width: 500,
        height: 400,
        marginBottom: 100,
    }
});