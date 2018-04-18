import React from 'react';
import {StyleSheet, Text, View, StatusBar,Dimensions, Image } from 'react-native';
import {
    StackNavigator
} from 'react-navigation';
import TripScreen from '../TripsScreen/Trips';
import ActionBar from 'react-native-action-bar';
import LinearGradient from 'react-native-linear-gradient';
import TabNavigator from 'react-native-tab-navigator';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Share extends React.Component {

    constructor(props) {
        super(props)
    }

    // navigation options to be used to navigate the class from other classes

    static navigationOptions = {
        title: 'Share',
        header: null
    }

    state = {
        email: '',
        password: '',
        authenticating: false,
        user: null,
        error: '',
        name: '',
        trips: [],
        tripsNames: [],
        modalVisible: false,
        UserInvite: '',
        newUser: 2,
    }


    px2dp(px) {

        const deviceW = Dimensions.get('window').width;

        const basePx = 375;

        return px * deviceW / basePx
    }

    componentWillMount() {
        const { navigate } = this.props.navigation;
        const { state } = this.props.navigation;
        this.setState({ email: state.params.email });

    }

    componentDidMount() {
        const { navigate } = this.props.navigation;
        const { state } = this.props.navigation;
        this.setState({ email: state.params.email });

    }


    render() {

        const { navigate } = this.props.navigation;
        const { state } = this.props.navigation;

        return (
            <LinearGradient colors={['#013067', '#00a5a9']} style={styles.linearGradient}>
            <View style={styles.mainStyle}>
            <StatusBar
               //backgroundColor="black"
               barStyle="dark-content"
             />
                <ActionBar
                    containerStyle={styles.bar}
                    title={'Share'}
                    titleStyle ={styles.title}
                    backgroundColor= {'#FFF'}
                    badgeColor={'red'}
                    iconImageStyle={{tintColor: "black"}}
                    leftIconImage={require('../../images/profile.png')}
                    onLeftPress={() => navigate('ProfileSettings', { email: state.params.email })}
                    rightIcons={[
                        {
                            image: require('../../images/settings.png'), // To use a custom image
                            onPress: () => navigate('AppSettings', { email: state.params.email }),
                        },
                    ]}
                />

                <Text style={styles.textStyle}>[Share Feature Coming Soon]</Text>


                <TabNavigator>
                        <TabNavigator.Item
                            selected={this.state.selectedTab === 'Chat'}
                            title="Chat"
                            renderIcon={() => <Image style={{width: 27, height: 27}} source={require('../../images/chat.png')} size={this.px2dp(15)} tintColor="#666" />}
                            renderSelectedIcon={() => <Image style={{width: 27, height: 27}} source={require('../../images/chat.png')} size={this.px2dp(15)} tintColor="#3496f0" />}
                            onPress={() => navigate('Chat', { email: this.state.email })}>
                        </TabNavigator.Item>

                        <TabNavigator.Item
                            selected={this.state.selectedTab === 'home'}
                            title="Home"
                            renderIcon={() => <Image style={{width: 27, height: 27}} source={require('../../images/home.png')} size={this.px2dp(15)} tintColor="#666" />}
                            renderSelectedIcon={() => <Image style={{width: 27, height: 27}} source={require('../../images/home.png')} size={this.px2dp(15)} tintColor="#3496f0" />}
                            onPress={() => navigate('Home', { email: this.state.email })}>
                        </TabNavigator.Item>

                        <TabNavigator.Item
                            selected={this.state.selectedTab === 'Share'}
                            title="Share"
                            renderIcon={() => <Image style={{width: 27, height: 27}} source={require('../../images/share.png')} size={this.px2dp(15)} tintColor="#3496f0" />}
                            renderSelectedIcon={() => <Image style={{width: 27, height: 27}} source={require('../../images/share.png')} size={this.px2dp(15)} tintColor="#3496f0" />}
                            onPress={() => navigate('Share', { email: this.state.email })}>
                        </TabNavigator.Item>
                    </TabNavigator>
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
    title: {
        textAlign: 'center',
        color: '#000',
        fontWeight: 'bold',
        fontSize: 20
    },
});
