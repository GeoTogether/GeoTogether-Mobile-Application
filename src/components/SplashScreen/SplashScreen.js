import React, {Component} from 'react';
import {View, Image, TouchableOpacity, StyleSheet, Text, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SplashTextLogo from '../SplashTextLogo/SplashTextLogo';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

export default class SplashScreen extends Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props)
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <LinearGradient colors={['#00B4AB', '#FE7C00']} style={styles.container}>
                <View style={styles.logoContainer}>
                <StatusBar
                   backgroundColor="black"
                   barStyle="light-content"
                 />
                    <View style={styles.logoContainerStyle}>
                        <Image
                            style={styles.logoStyle}
                            source={require('../../images/geotogetherlogo.png')}
                        />
                    </View>
                </View>
                <View style={styles.textLogoContainer}>
                    <View style={styles.textLogoContainerStyle}>
                        <Image
                            style={styles.textLogoStyle}
                            source={require('../../images/geotogethertext.png')}
                        />
                    </View>
                </View>
                <View style={styles.formContainer}>
                    <View style={styles.buttonFormat}>
                        <View style={styles.loginContainer}>
                            <TouchableOpacity onPress={() => navigate('Login')}>
                                <Text style={styles.buttonTextStyle}>Login</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.signUpContainer}>
                            <TouchableOpacity onPress={() => navigate('SignUp')}>
                                <Text style={styles.buttonTextStyle}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    logoContainer: {
        height: '60%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    logoContainerStyle: {
        width: '70%',
        height: '70%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '20%'
    },
    logoStyle: {
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },
    textLogoContainer: {
        height: '20%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textLogoContainerStyle: {
        height: '50%',
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '-5%'
    },
    textLogoStyle: {
        resizeMode: 'contain',
        width: '100%',
        height: '80%'
    },
    formContainer: {
        height: '20%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    buttonFormat: {
        width: '80%',
        height: '50%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    loginContainer: {
        width: '45%',
        height: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginLeft: '2%',
        backgroundColor: 'rgb(0,25,88)'
    },
    signUpContainer: {
        width: '45%',
        height: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginRight: '2%',
        backgroundColor: 'rgb(0,25,88)'
    },
    buttonTextStyle: {
        fontSize: 14,
        textAlign: 'center',
        color: 'white',
        fontWeight: '100',
    }
});
