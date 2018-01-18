import React, {Component} from 'react';
import {View, Image, TouchableOpacity, StyleSheet, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SplashButtons from './SplashButtons';

export default class SplashScreen extends Component<{}> {

    render() {
        return (
            <LinearGradient colors={['#00B4AB', '#FE7C00']} style={styles.linearGradient}>
                <View style={styles.container}>
                    <View style={styles.logoContainer}>
                        <Image
                            style={styles.logoStyle}
                            source={require('../images/geotogetherlogo.png')}
                        />
                    </View>
                    <View style={styles.textLogoContainer}>
                        <Image
                            style={styles.geoTextStyle}
                            source={require('../images/geotogethertext.png')}
                        />
                    </View>

                    <View style={styles.formContainer}>
                        <SplashButtons/>
                    </View>
                </View>
           </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 2
    },
    logoContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logoStyle: {
        width: 300,
        height: 300,
    },
    geoTextStyle: {
        width: 400,
        height: 400,
        marginTop: 10,
    }
});