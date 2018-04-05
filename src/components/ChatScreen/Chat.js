import React from 'react';
import {NativeAppEventEmitter, StyleSheet, Text, View} from 'react-native';
import { TabNavigator,} from 'react-navigation';
import TripScreen from '../TripsScreen/Trips';
import ActionBar from 'react-native-action-bar';
import LinearGradient from 'react-native-linear-gradient';
import { RevMobManager } from 'react-native-revmob';

export default class Chat extends React.Component {

    constructor(props) {
        super(props)
    }

    // navigation options to be used to navigate the class from other classes

    static navigationOptions = {
        title: 'Chat',
        header: null
    };

    componentDidMount(){
        RevMobManager.startSession("5ac329b0a30c3b1c882e56fb", function revMobStartSessionCb(err){
            if(!err) RevMobManager.loadBanner(); // Load banner if session starts successfully.
        });
        NativeAppEventEmitter.addListener('onRevmobBannerDidReceive', () => {
            RevMobManager.showBanner(); // Show banner if it's loaded
        });

    }

    componentWillUnmount(){
        RevMobManager.hideBanner();
    }

    componentDidUpdate(){
        RevMobManager.showBanner();
    }

    render() {

        const { navigate } = this.props.navigation;
        const { state } = this.props.navigation;

        return (
            <LinearGradient colors={['#013067', '#00a5a9']} style={styles.linearGradient}>
            <View style={styles.mainStyle}>

                <ActionBar
                    containerStyle={styles.bar}
                    title={'Chat'}
                    titleStyle ={styles.title}
                    backgroundColor= {'black'}
                    badgeColor={'red'}
                    leftIconImage={require('../../images/profile.png')}
                    onLeftPress={() => navigate('ProfileSettings', { email: state.params.email })}
                    rightIcons={[
                        {
                            image: require('../../images/settings.png'), // To use a custom image
                            badge: '1',
                            onPress: () => console.log('settings feature'),
                        },
                    ]}
                />

                <Text style={styles.textStyle}>[Chat Feature Coming Soon]</Text>
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
    }
});