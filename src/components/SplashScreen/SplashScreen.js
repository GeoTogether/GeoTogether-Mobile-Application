import React, {Component} from 'react';
import {View, Image, TouchableOpacity, StyleSheet, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SplashTextLogo from './SplashTextLogo';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

export default class SplashScreen extends Component {

    constructor(props) {
        super(props)

    }

    static navigationOptions = {
        header: null
    };

    render() {
        const {navigate} = this.props.navigation;
        return (

            <View style={styles.container}>

                <LinearGradient colors={['#00B4AB', '#FE7C00']}>

                <View style={styles.logoContainer}>
                    <Image
                        style={styles.logoStyle}
                        source={require('../../images/geotogetherlogo.png')}
                    />
                </View>

                <View style={styles.textLogoContainer}>
                    <Image
                    style={styles.textLogoStyle}
                    source={require('../../images/geotogethertext.png')}
                    />
                </View>

                <View style={styles.formContainer}>
                    <View style={styles.buttonFormat}>
                        <TouchableOpacity style={styles.buttonStyle} onPress={() => navigate('Login')}>
                            <Text style={styles.buttonTextStyle}>Login</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonFormat}>
                        <TouchableOpacity style={styles.buttonStyle} onPress={() => navigate('SignUp')}>
                            <Text style={styles.buttonTextStyle}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                </LinearGradient>
            </View>



        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logoContainer: {
        height: '45%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    logoStyle: {
        width: 250,
        height: 250
    },
    textLogoContainer: {
        height: '20%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textLogoStyle: {
        resizeMode: 'contain',
        width: 300,
        height: 200
    },
    formContainer: {
        height: '45%',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    buttonFormat: {
        width: '50%',
        height: '50%',
        padding: 20
    },
    buttonStyle: {
        backgroundColor: 'rgb(0,25,88)',
        width: 130,

    },
    buttonTextStyle: {
        fontSize: 14,
        textAlign: 'center',
        color: 'white',
        fontWeight: '500',
        borderRadius: 5,
        paddingVertical: 10,
    }

    // logoStyle: {
    //     flex: 1,
    //     width: 300,
    //     height: 300,
    // },
    // container2: {
    //     flex: 1,
    //     flexDirection: 'row',
    //     justifyContent: 'center',
    //     alignItems: 'center'
    // },
    // buttonContainer: {
    //     flex: 1,
    //     alignItems: 'center',
    //     backgroundColor: 'rgb(0,25,88)',
    //     paddingVertical: 10,
    //     borderRadius: 5,
    //     width: 130,
    //     margin: 5,
    //     //marginBottom: 400
    // },
    // buttonTextStyle: {
    //     fontSize: 14,
    //     textAlign: 'center',
    //     color: 'white',
    //     fontWeight: '500',
    //     //margin: 10
    // }
    //

});