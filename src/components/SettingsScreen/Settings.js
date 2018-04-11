import React from 'react';
import {StyleSheet, Text, View,AppRegistry, PixelRatio, TouchableOpacity, Image } from 'react-native';
import { TabNavigator,} from 'react-navigation';
import TripScreen from '../TripsScreen/Trips';
import ActionBar from 'react-native-action-bar';
import LinearGradient from 'react-native-linear-gradient';
import firebase from '../Firebase/firebaseStorage';

export default class Settings extends React.Component {

    constructor(props) {
        super(props)
    }

    // navigation options to be used to navigate the class from other classes

    static navigationOptions = {
        title: 'Settings',
        header: null
    }


        // funcation to sign out using firebase authentication.

        onPressLogOut() {
            const { navigate } = this.props.navigation;
    
            if (firebase.auth().currentUser !== null) {
    
                firebase.auth().signOut()
                    .then(() => {
                        this.setState({
                            email: '',
                            password: '',
                            authenticating: false,
                            user: null,
                        })
                        navigate('SplashScreen') // after login go to trips
    
                    }, error => {
                        console.error('Sign Out Error', error);
                    });
            }
        }

    render() {

        const { navigate } = this.props.navigation;
        const { state } = this.props.navigation;

        return (
            <LinearGradient colors={['#013067', '#00a5a9']} style={styles.linearGradient}>
            <View style={styles.mainStyle}>

                <ActionBar
                    containerStyle={styles.bar}
                    title={'Settings'}
                    titleStyle ={styles.title}
                    backgroundColor= {'black'}
                    badgeColor={'red'}
                    leftIconImage={require('../../images/profile.png')}
                    onLeftPress={() => navigate('ProfileSettings', { email: state.params.email })}
                    rightIcons={[
                        {
                            image: require('../../images/settings.png'), // To use a custom image
                            badge: '1',
                            onPress: () => navigate('Settings', { email: state.params.email })
                        },
                    ]}
                />

                <View style={styles.updateBContainer}>
                    <TouchableOpacity  style={styles.buttonContainer}  onPress={() => this.onPressLogOut()}>
                        <Text style={styles.buttonText}>Log OUt</Text>
                    </TouchableOpacity>
                </View>

            </View>
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    mainStyle: {
        flex: 1,
        width: '100%',
    },
    textStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: '#FFF',
        fontSize: 20,
        marginTop: '60%'
    },
    updateBContainer:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        backgroundColor: 'rgb(0,25,88)',
        width: 300,
        height: 45,
        justifyContent: 'center',
        borderRadius: 10
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '100'
    }
});